import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import {
  Between,
  Equal,
  FindOperator,
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UsersService } from 'src/users/users.service';
import {
  addMinutesToDate,
  removeSecondsAndMilliseconds,
} from 'src/helpers/date.helpers';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private usersService: UsersService,
    private servicesService: ServicesService,
  ) {}

  async findBookingByDate(date: Date) {
    return this.repo.findOneBy({
      date: Equal(date),
    });
  }

  async findBookingById(id: string) {
    const booking = await this.repo.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('Booking is not found');
    }
    return booking;
  }

  async createBookingForUser(
    { date, serviceId }: CreateBookingDto,
    userId: string,
  ) {
    await this.usersService.findUserById(userId);
    await this.servicesService.getServiceById(serviceId);

    const formattedDate = removeSecondsAndMilliseconds(date);
    const isDateAvailable = await this.checkIfDateIsAvailable(
      formattedDate,
      serviceId,
    );

    if (!isDateAvailable) {
      throw new BadRequestException('Chosen date is unavailable');
    }
    const booking = this.repo.create({
      date: formattedDate,
      userId,
      serviceId,
    });
    return this.repo.save(booking);
  }

  async deleteUserBooking(bookingId: string, userId: string) {
    const booking = await this.findBookingById(bookingId);
    if (booking.userId !== userId) {
      throw new ForbiddenException('Cannot delete this booking');
    }
    return this.repo.remove(booking);
  }

  async getUserBookings(userId: string) {
    return this.repo.find({
      where: { userId },
    });
  }

  async getCompanyBookingsByDate(
    companyId: string,
    minDate?: Date,
    maxDate?: Date,
  ) {
    minDate = minDate || maxDate ? minDate : new Date();
    let dateFilter: FindOperator<Date> | undefined;
    if (minDate && maxDate) {
      dateFilter = Between(minDate, maxDate);
    } else if (minDate) {
      dateFilter = MoreThan(minDate);
    } else if (maxDate) {
      dateFilter = LessThan(maxDate);
    }

    const bookings = await this.repo.find({
      where: {
        service: { company: { id: companyId } },
        date: dateFilter,
      },
      relations: ['service'],
      order: { date: 'ASC' },
    });
    return bookings.map((booking) => ({
      id: booking.id,
      userId: booking.userId,
      serviceId: booking.serviceId,
      companyId: booking.service.companyId,
      startDate: booking.date,
      endDate: addMinutesToDate(booking.date, booking.service.duration),
    }));
  }

  async checkIfDateIsAvailable(date: Date, serviceId: string) {
    const bookings = await this.repo.find({
      where: {
        serviceId,
        date: MoreThanOrEqual(new Date()),
      },
      relations: ['service'],
      order: { date: 'ASC' },
    });
    return !bookings.some((booking, index) => {
      const startDate = booking.date;
      const endDate = addMinutesToDate(booking.date, booking.service.duration);
      if (index < bookings.length - 1) {
        const nextStartDate = bookings[index + 1].date;
        return (
          (date >= startDate && date <= endDate) ||
          (date >= endDate && date <= nextStartDate)
        );
      }
      return date >= startDate && date <= endDate;
    });
  }
}
