import { set } from 'date-fns';

export const removeSecondsAndMilliseconds = (date: Date) => {
  return set(new Date(date), { seconds: 0, milliseconds: 0 });
};
