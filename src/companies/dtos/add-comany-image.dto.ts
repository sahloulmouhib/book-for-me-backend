import { IsNotEmpty, IsString } from 'class-validator';

export class AddCompanyImageDto {
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
