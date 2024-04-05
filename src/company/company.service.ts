import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { WEEK_DAYS_LENGTH } from './constants';
import { AvailabilityService } from 'src/availability/availability.service';
import { CompanyAvailability } from 'src/availability/types';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private repo: Repository<Company>,
    private availabilityService: AvailabilityService,
  ) {}

  async createCompany(
    ownerId: string,
    title: string,
    availabilities: CompanyAvailability[],
  ) {
    if (availabilities.length !== WEEK_DAYS_LENGTH) {
      throw new BadRequestException('Invalid availability array length');
    }

    const company = this.repo.create({ ownerId, title });
    const createdCompany = await this.repo.save(company);
    const createdAvailabilities = await this.availabilityService.create(
      availabilities,
      createdCompany.id,
    );

    return {
      company: createdCompany,
      availabilities: createdAvailabilities,
    };
  }
}
