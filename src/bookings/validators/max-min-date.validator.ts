import {
  ValidatorConstraint,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsMinMaxDate', async: false })
class IsMinMaxDateValidator {
  validate(minDate: Date, args: ValidationArguments) {
    const [maxDatePropertyName] = args.constraints;
    const maxDateProperty = (args.object as any)[maxDatePropertyName];
    if (minDate && maxDateProperty) {
      return minDate < maxDateProperty;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [maxDatePropertyName] = args.constraints;
    return `$property should be less than ${maxDatePropertyName}`;
  }
}

export function IsMinMaxDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMinMaxDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsMinMaxDateValidator,
      constraints: [property],
    });
  };
}
