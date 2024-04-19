import {
  ForbiddenException,
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
import { CreateAvailabilityDto } from '../availabilities/dtos/create-availability.dto';
import { CreateServiceDto } from 'src/services/dtos/create-service.dto';
import { isAdminOrAllowedUser } from 'src/helpers/helpers';
import { User } from 'src/users/user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private repo: Repository<Company>,
    private availabilitiesService: AvailabilitiesService,
    @Inject(forwardRef(() => ServicesService))
    private servicesService: ServicesService,
  ) {}

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
    return company;
  }

  async createCompany(
    ownerId: string,
    title: string,
    availabilities: CreateAvailabilityDto[],
    services: CreateServiceDto[],
  ) {
    // TODO: add transaction
    const company = this.repo.create({ ownerId, title });
    const createdCompany = await this.repo.save(company);
    const createdAvailabilities = await this.availabilitiesService.create(
      availabilities,
      createdCompany.id,
    );
    const createdService = await this.servicesService.createCompanyServices(
      company.id,
      services,
    );

    return {
      company: createdCompany,
      availabilities: formatAvailabilities(createdAvailabilities),
      services: createdService,
    };
  }

  async getCompanyProfile(companyId: string) {
    const company = await this.getCompany(companyId);
    const availabilities =
      await this.availabilitiesService.getCompanyAvailabilities(companyId);
    return {
      company,
      availabilities,
    };
  }

  async checkCompanyOwner(companyId: string, owner: User) {
    const company = await this.getCompany(companyId);
    if (!isAdminOrAllowedUser(owner, company.ownerId)) {
      throw new ForbiddenException(
        'You are not allowed to manage to this company',
      );
    }
  }
}
