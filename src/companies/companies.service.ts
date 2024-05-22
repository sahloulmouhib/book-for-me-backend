import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { AvailabilitiesService } from 'src/availabilities/availabilities.service';
import { formatAvailabilities } from 'src/availabilities/availabilities.helpers';
import { ServicesService } from 'src/services/services.service';
import { CreateAvailabilityDto } from '../availabilities/dtos/create-availability.dto';
import { CreateServiceDto } from 'src/services/dtos/create-service.dto';
import { isAdminOrAllowedUser } from 'src/helpers/helpers';
import { User } from 'src/users/user.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private repo: Repository<Company>,
    private availabilitiesService: AvailabilitiesService,
    @Inject(forwardRef(() => ServicesService))
    private servicesService: ServicesService,
  ) {}

  async getCompanyById(companyId: string) {
    const company = await this.repo.findOneBy({
      id: companyId,
    });
    if (!company) {
      throw new NotFoundException('Company is not found');
    }
    return company;
  }

  @Transactional() // Will open a transaction if one doesn't already exist
  async createCompany(
    ownerId: string,
    title: string,
    description: string,
    availabilities: CreateAvailabilityDto[],
    services: CreateServiceDto[],
  ) {
    const company = this.repo.create({ ownerId, title, description });
    const createdCompany = await this.repo.save(company);
    const createdAvailabilities =
      await this.availabilitiesService.createCompanyAvailabilities(
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
    const [company, services, availabilities] = await Promise.all([
      this.getCompanyById(companyId),
      this.servicesService.getCompanyServices(companyId),
      this.availabilitiesService.getCompanyAvailabilities(companyId),
    ]);
    return {
      company,
      availabilities,
      services,
    };
  }

  async checkCompanyOwner(companyId: string, owner: User) {
    const company = await this.getCompanyById(companyId);
    if (!isAdminOrAllowedUser(owner, company.ownerId)) {
      throw new ForbiddenException(
        'You are not allowed to manage to this company',
      );
    }
  }

  async addCompanyImage(
    companyId: string,
    imagePath: string,
    companyOwner: User,
  ) {
    const company = await this.getCompanyById(companyId);
    await this.checkCompanyOwner(companyId, companyOwner);
    company.imagePath = imagePath;
    await this.repo.save(company);
    return company;
  }
}
