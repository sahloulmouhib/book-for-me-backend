import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity';

@Module({
  providers: [AvailabilitiesService],
  exports: [AvailabilitiesService],
  imports: [TypeOrmModule.forFeature([Availability])],
})
export class AvailabilitiesModule {}
