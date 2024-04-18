import { WeekdayEnum } from 'src/enums';
import { Availability } from './availability.entity';
import { AvailabilitySlot, CompanyAvailability } from './availability.types';

export const formatAvailabilities = (
  availabilities: Availability[],
): CompanyAvailability[] => {
  const companyAvailability: Record<WeekdayEnum, AvailabilitySlot[]> | object =
    {};
  availabilities.forEach(({ endTime, startTime, weekDay }) => {
    if (!companyAvailability.hasOwnProperty(weekDay)) {
      companyAvailability[weekDay] = [{ startTime, endTime }];
    } else {
      companyAvailability[weekDay].push({ startTime, endTime });
    }
  });
  const formattedAvailabilities: CompanyAvailability[] = Object.entries(
    companyAvailability,
  ).map((item) => {
    return {
      weekDay: parseInt(item[0]),
      slots: item[1],
    };
  });
  return formattedAvailabilities;
};
