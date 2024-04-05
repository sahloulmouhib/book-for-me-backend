import { WeekdayEnum } from 'src/enums';

interface AvailabilitySlot {
  startTime: number;
  endTime: number;
}

export interface CompanyAvailability {
  weekDay: WeekdayEnum;
  slots: AvailabilitySlot[];
}
