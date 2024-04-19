// custom.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CompanyAvailability } from 'src/availabilities/availabilities.types';
import { WeekdayEnum } from 'src/enums';

@ValidatorConstraint({ name: 'IsAvailabilities', async: false })
export class AvailabilitiesValidator implements ValidatorConstraintInterface {
  validate(value: unknown) {
    const availabilities = value as CompanyAvailability[];

    let isValid = true;

    const weekDayArray = [];
    availabilities.forEach((availability) => {
      weekDayArray.push(availability.weekDay);
      availability.slots.length > 0 &&
        availability.slots.forEach((slot) => {
          if (slot.startTime > slot.endTime) {
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
    return `availabilities array must include all week days ids from ${WeekdayEnum.Monday} to ${WeekdayEnum.Sunday}, each slot must have a startTime smaller than endTime`;
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
