import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsAvailabilities } from '../../availabilities/validators/availability.validator';
import {
  MAX_MULTILINE_STRING_LENGTH,
  MAX_STRING_LENGTH,
  MIN_STRING_LENGTH,
} from 'src/constants';
import { WEEK_DAYS_LENGTH } from '../companies.constants';
import { CreateAvailabilityDto } from '../../availabilities/dtos/create-availability.dto';
import { Type } from 'class-transformer';
import { CreateServiceDto } from 'src/services/dtos/create-service.dto';
import { MIN_SERVICES_SIZE } from 'src/services/services.constants';

export class CreateCompanyDto {
  @MaxLength(MAX_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  @IsString()
  title: string;

  @MaxLength(MAX_MULTILINE_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  description: string;

  @IsAvailabilities()
  @IsArray()
  @ArrayMaxSize(WEEK_DAYS_LENGTH)
  @ArrayMinSize(WEEK_DAYS_LENGTH)
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityDto)
  availabilities: CreateAvailabilityDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  @IsArray()
  @ArrayMinSize(MIN_SERVICES_SIZE)
  services: CreateServiceDto[];
}
