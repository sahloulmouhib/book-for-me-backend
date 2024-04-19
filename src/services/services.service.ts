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

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private repo: Repository<Service>,
    @Inject(forwardRef(() => CompaniesService))
    private companiesService: CompaniesService,
  ) {}

  async create(companyId: string, title: string, duration: number) {
    const service = this.repo.create({ companyId, title, duration });
    return this.repo.save(service);
  }

  async add(companyId: string, title: string, duration: number) {
    const company = await this.companiesService.find(companyId);
    if (!company) {
      throw new NotFoundException('Company is not found');
    }
    return this.create(companyId, title, duration);
  }
}
