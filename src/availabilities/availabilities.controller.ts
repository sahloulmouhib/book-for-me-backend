import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AvailabilitiesService } from './availabilities.service';
import { UpdateCompanyDto } from './dtos/update-company-availabilities.dto';

@UseGuards(AuthGuard)
@Controller('')
export class AvailabilitiesController {
  constructor(private availabilityService: AvailabilitiesService) {}

  @Get('companies/:companyId/availabilities')
  getCompanyServices(@Param('companyId') companyId: string) {
    return this.availabilityService.getCompanyAvailabilities(companyId);
  }

  @Patch('availabilities')
  updateCompanyAvailabilities(
    @Body() { availabilities, companyId }: UpdateCompanyDto,
  ) {
    return this.availabilityService.updateCompanyAvailabilities(
      availabilities,
      companyId,
    );
  }
}
