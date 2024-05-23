import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  MAX_SERVICE_DURATION,
  MIN_SERVICE_DURATION,
} from '../services.constants';
import {
  MAX_MULTILINE_STRING_LENGTH,
  MAX_STRING_LENGTH,
  MIN_STRING_LENGTH,
} from 'src/constants';

export class CreateServiceDto {
  @MaxLength(MAX_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  @IsString()
  title: string;

  @IsOptional()
  @MaxLength(MAX_MULTILINE_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  @IsString()
  description: string;

  @IsNumber()
  @Max(MAX_SERVICE_DURATION)
  @Min(MIN_SERVICE_DURATION)
  duration: number;

  @Min(0)
  price: number;
}
