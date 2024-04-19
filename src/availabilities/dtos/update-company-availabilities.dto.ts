import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { WEEK_DAYS_LENGTH } from 'src/constants';
import { IsAvailabilities } from '../validators/availability.validator';
import { CreateAvailabilityDto } from './create-availability.dto';

export class UpdateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsAvailabilities()
  @IsArray()
  @ArrayMaxSize(WEEK_DAYS_LENGTH)
  @ArrayMinSize(WEEK_DAYS_LENGTH)
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityDto)
  availabilities: CreateAvailabilityDto[];
}
