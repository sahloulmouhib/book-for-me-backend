import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Availability } from './availability.entity';
import { formatAvailabilities } from './availabilities.helpers';
import { CreateAvailabilityDto } from 'src/availabilities/dtos/create-availability.dto';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectRepository(Availability)
    private repo: Repository<Availability>,
  ) {}

  async createCompanyAvailabilities(
    availabilities: CreateAvailabilityDto[],
    companyId: string,
  ) {
    const newAvailabilities: Array<DeepPartial<Availability>> = [];
    availabilities.forEach(({ slots, weekDay }) => {
      slots.length > 0 &&
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

  async deleteCompanyAvailabilities(companyId: string) {
    const availabilities = await this.repo.findBy({ companyId });
    if (availabilities.length === 0) {
      throw new NotFoundException('No Availabilities found for this company');
    }
    return this.repo.remove(availabilities);
  }

  async updateCompanyAvailabilities(
    availabilities: CreateAvailabilityDto[],
    companyId: string,
  ) {
    await this.deleteCompanyAvailabilities(companyId);
    const createdAvailabilities = await this.createCompanyAvailabilities(
      availabilities,
      companyId,
    );
    return formatAvailabilities(createdAvailabilities);
  }
}
