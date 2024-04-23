import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';
import { IsMinMaxDate } from '../validators/max-min-date.validator';
export class GetCompaniesBookingsDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  maxDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsMinMaxDate('maxDate')
  minDate: Date;
}
