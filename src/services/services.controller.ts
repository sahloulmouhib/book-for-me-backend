import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedUser } from 'src/decorators/authentificated-user';
import { User } from 'src/users/user.entity';
import { AddCompanyServiceDto } from './dtos/add-company-services.dto';

@UseGuards(AuthGuard)
@Controller('services')
export class ServicesController {
  constructor(private serviceService: ServicesService) {}

  @Post('')
  addCompanyServices(
    @Body() { companyId, services }: AddCompanyServiceDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.serviceService.addCompanyServices(user, companyId, services);
  }
  @Get('/:companyId/companies')
  getCompanyServices(@Param('companyId') companyId: string) {
    return this.serviceService.getCompanyServices(companyId);
  }
}
