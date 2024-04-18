import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedUser } from 'src/decorators/authentificated-user';
import { User } from 'src/users/user.entity';
import { CreateCompanyDto } from './dtos/create-company.dto';

@UseGuards(AuthGuard)
@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  createCompany(
    @Body() { availabilities, title }: CreateCompanyDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.companyService.createCompany(user.id, title, availabilities);
  }

  @Get('/availabilities/:id')
  getCompanyAvailabilities(@Param('id') id: string) {
    return this.companyService.getCompany(id);
  }
}
