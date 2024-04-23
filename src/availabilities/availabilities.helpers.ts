import { WeekdayEnum } from 'src/enums';
import { Availability } from './availability.entity';
import { CreateAvailabilityDto } from './dtos/create-availability.dto';
import { CreateSlotDto } from './dtos/create-slot.dto';

export const formatAvailabilities = (
  availabilities: Availability[],
): CreateAvailabilityDto[] => {
  const availability: Record<WeekdayEnum, CreateSlotDto[]> | object = {};
  availabilities.forEach(({ endTime, startTime, weekDay }) => {
    if (!availability.hasOwnProperty(weekDay)) {
      availability[weekDay] = [{ startTime, endTime }];
    } else {
      availability[weekDay].push({ startTime, endTime });
    }
  });
  const formattedAvailabilities: CreateAvailabilityDto[] = Object.entries(
    availability,
  ).map((item) => {
    return {
      weekDay: parseInt(item[0]),
      slots: item[1],
    };
  });
  return formattedAvailabilities;
};
