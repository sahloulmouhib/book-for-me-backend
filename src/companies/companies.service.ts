import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './companies.entity';
import { Repository } from 'typeorm';
import { AvailabilitiesService } from 'src/availabilities/availabilities.service';
import { formatAvailabilities } from 'src/availabilities/availabilities.helpers';
import { ServicesService } from 'src/services/services.service';
import { CompanyService } from 'src/services/services.types';
import { CreateAvailabilityDto } from '../availabilities/dtos/create-availability.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private repo: Repository<Company>,
    private availabilitiesService: AvailabilitiesService,
    @Inject(forwardRef(() => ServicesService))
    private servicesService: ServicesService,
  ) {}

  async createCompany(
    ownerId: string,
    title: string,
    availabilities: CreateAvailabilityDto[],
    service: CompanyService,
  ) {
    // TODO: add transaction
    const company = this.repo.create({ ownerId, title });
    const createdCompany = await this.repo.save(company);
    const createdAvailabilities = await this.availabilitiesService.create(
      availabilities,
      createdCompany.id,
    );
    const createdService = await this.servicesService.create(
      company.id,
      service.title,
      service.duration,
    );

    return {
      company: createdCompany,
      availabilities: formatAvailabilities(createdAvailabilities),
      service: createdService,
    };
  }

  async find(companyId: string) {
    const company: Company | null = companyId
      ? await this.repo.findOneBy({
          id: companyId,
        })
      : null;
    return company;
  }

  async getCompany(companyId: string) {
    const company = await this.find(companyId);
    if (!company) {
      throw new NotFoundException('Company is not found');
    }
    const availabilities =
      await this.availabilitiesService.getCompanyAvailabilities(companyId);
    return {
      company,
      availabilities,
    };
  }
}
