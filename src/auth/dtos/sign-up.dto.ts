import {
  IsEmail,
  IsIn,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  signUpUserValidation,
  strongPasswordValidation,
  strongPasswordValidationMessage,
} from '../auth.constants';
import { UserRoleEnum } from 'src/users/users.enums';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from 'src/constants';
import { Match } from '../validators/match.validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(strongPasswordValidation, {
    message: strongPasswordValidationMessage,
  })
  @MaxLength(signUpUserValidation.password.MAX_LENGTH)
  @MinLength(signUpUserValidation.password.MIN_LENGTH)
  @IsString()
  password: string;

  @IsStrongPassword(strongPasswordValidation, {
    message: strongPasswordValidationMessage,
  })
  @MaxLength(signUpUserValidation.password.MAX_LENGTH)
  @MinLength(signUpUserValidation.password.MIN_LENGTH)
  @IsString()
  @Match('password')
  confirmPassword: string;

  @MaxLength(MAX_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  @IsString()
  firstName: string;

  @MaxLength(MAX_STRING_LENGTH)
  @MinLength(MIN_STRING_LENGTH)
  @IsString()
  lastName: string;

  // eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
  @IsNumber()
  @IsIn([UserRoleEnum.User, UserRoleEnum.CompanyOwner])
  role: UserRoleEnum.User | UserRoleEnum.CompanyOwner;
}
