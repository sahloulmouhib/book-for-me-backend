import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { AvailabilityModule } from 'src/availability/availability.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [AvailabilityModule, TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
