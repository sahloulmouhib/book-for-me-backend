import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [TypeOrmModule.forFeature([Booking]), UsersModule, ServicesModule],
})
export class BookingsModule {}
