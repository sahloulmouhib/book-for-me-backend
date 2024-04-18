import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Availability } from './availability.entity';
import { CompanyAvailability } from './availability.types';
import { formatAvailabilities } from './availability.helpers';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private repo: Repository<Availability>,
  ) {}

  async create(availabilities: CompanyAvailability[], companyId: string) {
    const newAvailabilities: Array<DeepPartial<Availability>> = [];
    availabilities.forEach(({ slots, weekDay }) => {
      slots.forEach(({ endTime, startTime }) => {
        newAvailabilities.push({
          companyId,
          endTime,
          startTime,
          weekDay,
        });
      });
    });
    const createdAvailabilities = this.repo.create(newAvailabilities);
    return this.repo.save(createdAvailabilities);
  }

  async getCompanyAvailabilities(companyId: string) {
    const availabilities = await this.repo.findBy({ companyId });
    return formatAvailabilities(availabilities);
  }
}
