import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedUser } from 'src/decorators/authentificated-user';
import { User } from 'src/users/user.entity';
import { CreateCompanyDto } from './dtos/create-company.dto';

@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}

  @Post()
  createCompany(
    @Body() { availabilities, title, services }: CreateCompanyDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.companyService.createCompany(
      user.id,
      title,
      availabilities,
      services,
    );
  }

  @Get('profile/:id')
  getCompanyProfile(@Param('id') id: string) {
    return this.companyService.getCompanyProfile(id);
  }
}
