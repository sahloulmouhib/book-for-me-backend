import { IsEnum, ValidateNested } from 'class-validator';
import { CreateSlotDto } from './create-slot.dto';
import { WeekdayEnum } from 'src/enums';
import { Type } from 'class-transformer';

export class CreateAvailabilityDto {
  @IsEnum(WeekdayEnum)
  weekDay: WeekdayEnum;

  @ValidateNested({ each: true })
  @Type(() => CreateSlotDto)
  slots: CreateSlotDto[];
}
