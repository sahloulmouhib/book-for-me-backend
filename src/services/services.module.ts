import { Module, forwardRef } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
  imports: [
    TypeOrmModule.forFeature([Service]),
    forwardRef(() => CompaniesModule),
  ],
})
export class ServicesModule {}
