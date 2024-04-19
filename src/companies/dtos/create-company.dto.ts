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
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from 'src/constants';
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

  // eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
  @IsAvailabilities()
  @IsArray()
  @ArrayMaxSize(WEEK_DAYS_LENGTH)
  @ArrayMinSize(WEEK_DAYS_LENGTH)
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityDto)
  availabilities: CreateAvailabilityDto[];

  // eslint-disable-next-line @darraghor/nestjs-typed/validate-nested-of-array-should-set-each
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  @IsArray()
  @ArrayMinSize(MIN_SERVICES_SIZE)
  services: CreateServiceDto[];
}
