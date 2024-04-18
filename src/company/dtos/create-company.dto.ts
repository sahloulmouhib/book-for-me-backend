import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyAvailability } from 'src/availability/availability.types';
import { IsAvailabilities } from '../validators/availability.validator';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from 'src/constants';
import { WEEK_DAYS_LENGTH } from '../constants';

export class CreateCompanyDto {
  @MaxLength(MAX_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  @IsString()
  title: string;

  // eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
  @IsAvailabilities()
  @IsArray()
  @ArrayMaxSize(WEEK_DAYS_LENGTH)
  @ArrayMinSize(WEEK_DAYS_LENGTH)
  availabilities: CompanyAvailability[];
}
