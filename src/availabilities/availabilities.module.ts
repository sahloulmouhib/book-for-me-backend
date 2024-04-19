import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { AvailabilitiesController } from './availabilities.controller';

@Module({
  providers: [AvailabilitiesService],
  exports: [AvailabilitiesService],
  imports: [TypeOrmModule.forFeature([Availability])],
  controllers: [AvailabilitiesController],
})
export class AvailabilitiesModule {}
