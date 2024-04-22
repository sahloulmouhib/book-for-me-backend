import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxDate,
  MinDate,
} from 'class-validator';
import { addYearsToDate } from 'src/helpers/date.helpers';
import { BOOKING_YEAR_TO_ADD_FROM_NOW } from '../bookings.constants';

export class CreateBookingDto {
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), { message: 'Date must be in the future' })
  @MaxDate(addYearsToDate(new Date(), BOOKING_YEAR_TO_ADD_FROM_NOW), {
    message: 'Date must be within a year from now',
  })
  date: Date;

  @IsNotEmpty()
  @IsString()
  serviceId: string;
}
