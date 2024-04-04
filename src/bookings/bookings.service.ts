import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Equal, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { removeSecondsAndMilliseconds } from 'src/helpers/date.helpers';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private usersService: UsersService,
  ) {}

  async findOneByDate(date: Date) {
    return this.repo.findOne({
      where: {
        date: Equal(date),
      },
    });
  }

  async findOneById(id: string) {
    return !id
      ? null
      : this.repo.findOne({
          where: { id },
        });
  }

  async create(date: Date, userId: string) {
    const formattedDate = removeSecondsAndMilliseconds(date);
    const isUserIdExists = !!(await this.usersService.findOneById(userId));
    if (!isUserIdExists) {
      throw new NotFoundException('User is not found');
    }
    const isDateTaken = await this.findOneByDate(formattedDate);
    if (isDateTaken) {
      throw new BadRequestException('Chosen date is already taken');
    }
    const booking = this.repo.create({ date: formattedDate, userId });
    return this.repo.save(booking);
  }

  async deleteUserBooking(bookingId: string, userId: string) {
    const booking = await this.findOneById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking is not found');
    }
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
}
