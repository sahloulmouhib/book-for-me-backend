import { IsEnum, ValidateNested } from 'class-validator';
import { CreateSlotDto } from './create-slot.dto';
import { WeekdayEnum } from 'src/enums';
import { Type } from 'class-transformer';

export class CreateAvailabilityDto {
  @IsEnum(WeekdayEnum)
  weekDay: WeekdayEnum;

  @ValidateNested({ each: true })
  @Type(() => CreateSlotDto)
  // eslint-disable-next-line @darraghor/nestjs-typed/all-properties-are-whitelisted, @darraghor/nestjs-typed/all-properties-have-explicit-defined
  slots: CreateSlotDto[];
}
