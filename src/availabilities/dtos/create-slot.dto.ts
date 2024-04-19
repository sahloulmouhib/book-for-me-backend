import { Min, Max, IsNumber } from 'class-validator';
import { MAX_DAY_MINUTES, MIN_DAY_MINUTES } from 'src/constants';

export class CreateSlotDto {
  @IsNumber()
  @Max(MAX_DAY_MINUTES)
  @Min(MIN_DAY_MINUTES)
  startTime: number;

  @IsNumber()
  @Max(MAX_DAY_MINUTES)
  @Min(MIN_DAY_MINUTES)
  endTime: number;
}
