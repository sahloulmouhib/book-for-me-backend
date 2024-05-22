import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private repo: Repository<Service>,
    @Inject(forwardRef(() => CompaniesService))
    private companiesService: CompaniesService,
  ) {}

  async getServiceById(serviceId: string) {
    const service = await this.repo.findOneBy({ id: serviceId });
    if (!service) {
      throw new NotFoundException('Service was not found');
    }
    return service;
  }

  async createCompanyServices(companyId: string, services: CreateServiceDto[]) {
    const servicesToCreate = services.map(
      ({ duration, title, description, price }) => ({
        companyId,
        title,
        duration,
        description,
        price,
      }),
    );
    const createdServices = this.repo.create(servicesToCreate);
    return this.repo.save(createdServices);
  }

  async addCompanyServices(
    user: User,
    companyId: string,
    services: CreateServiceDto[],
  ) {
    await this.companiesService.checkCompanyOwner(companyId, user);
    return this.createCompanyServices(companyId, services);
  }

  async getCompanyServices(companyId: string) {
    return this.repo.findBy({ companyId });
  }
}
