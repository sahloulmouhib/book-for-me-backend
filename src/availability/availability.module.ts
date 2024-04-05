import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availability.entity';

@Module({
  providers: [AvailabilityService],
  exports: [AvailabilityService],
  imports: [TypeOrmModule.forFeature([Availability])],
})
export class AvailabilityModule {}
