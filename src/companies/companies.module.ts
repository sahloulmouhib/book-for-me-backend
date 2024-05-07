import { Module, forwardRef } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { AvailabilitiesModule } from 'src/availabilities/availabilities.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
  imports: [
    TypeOrmModule.forFeature([Company]),
    AvailabilitiesModule,
    forwardRef(() => ServicesModule),
  ],
})
export class CompaniesModule {}
