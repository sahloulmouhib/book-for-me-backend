import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingsService } from './bookings.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedUser } from 'src/decorators/authentificated-user';
import { User } from 'src/users/user.entity';

@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}
  @Post()
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.bookingsService.create(createBookingDto, user.id);
  }

  @Get()
  getUserBookings(@AuthenticatedUser() user: User) {
    return this.bookingsService.getUserBookings(user.id);
  }

  @Delete('/:id')
  deleteUserBooking(@Param('id') id: string, @AuthenticatedUser() user: User) {
    return this.bookingsService.deleteUserBooking(id, user.id);
  }
}
