import { set, getMinutes, getYear } from 'date-fns';

export const removeSecondsAndMilliseconds = (date: Date) => {
  return set(new Date(date), { seconds: 0, milliseconds: 0 });
};

export const addMinutesToDate = (date: Date, minutes: number) => {
  return set(new Date(date), { minutes: getMinutes(date) + minutes });
};

export const addYearsToDate = (date: Date, years: number) => {
  return set(new Date(date), { year: getYear(date) + years });
};
