import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyAvailability } from 'src/availability/types';

export class CreateCompanyDto {
  //TODO: add to constants
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  title: string;

  //TODO: create custom validator
  @IsArray()
  @ArrayMaxSize(7)
  @ArrayMinSize(7)
  availabilities: CompanyAvailability[];
}
