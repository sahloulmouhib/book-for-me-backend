import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  @Type(() => Date)
  date: Date;
}
