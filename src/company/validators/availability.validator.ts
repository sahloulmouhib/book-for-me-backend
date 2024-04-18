// custom.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CompanyAvailability } from 'src/availability/availability.types';
import { MIN_DAY_MINUTES, MAX_DAY_MINUTES } from 'src/constants';
import { WeekdayEnum } from 'src/enums';

@ValidatorConstraint({ name: 'IsAvailabilities', async: false })
export class AvailabilitiesValidator implements ValidatorConstraintInterface {
  validate(value: unknown) {
    const availabilities = value as CompanyAvailability[];

    let isValid = true;

    const weekDayArray = [];
    availabilities.forEach((availability) => {
      if (availability.slots.length === 0) {
        isValid = false;
        return;
      }
      weekDayArray.push(availability.weekDay);
      availability.slots.forEach((slot) => {
        if (
          slot.startTime <= MIN_DAY_MINUTES ||
          slot.startTime >= MAX_DAY_MINUTES ||
          slot.endTime <= MIN_DAY_MINUTES ||
          slot.endTime >= MAX_DAY_MINUTES ||
          slot.startTime > slot.endTime
        ) {
          isValid = false;
        }
        if (!isValid) return;
      });
    });
    const weekDayIds = Object.values(WeekdayEnum);
    if (!weekDayArray.every((item) => weekDayIds.includes(item))) {
      isValid = false;
    }
    return isValid;
  }

  defaultMessage() {
    return `Availabilities array must include all week days ids from ${WeekdayEnum.Monday} to ${WeekdayEnum.Sunday}, each availability must have a startTime and endTime between 0 and 3600, and startTime must be smaller than endTime`;
  }
}

export function IsAvailabilities(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAvailabilities',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AvailabilitiesValidator,
    });
  };
}
