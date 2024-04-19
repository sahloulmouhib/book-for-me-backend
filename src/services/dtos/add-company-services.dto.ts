import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class AddCompanyServiceDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  services: CreateServiceDto[];
}
