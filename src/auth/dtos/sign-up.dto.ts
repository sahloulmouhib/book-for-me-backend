import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { signUpUserValidation } from '../constants';
import { UserRoleEnum } from 'src/users/users.enums';
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from 'src/constants';

export class SignUpDto {
  @IsEmail()
  email: string;

  @MaxLength(signUpUserValidation.password.MAX_LENGTH)
  @MinLength(signUpUserValidation.password.MIN_LENGTH)
  @IsString()
  password: string;

  @MaxLength(signUpUserValidation.password.MAX_LENGTH)
  @MinLength(signUpUserValidation.password.MIN_LENGTH)
  @IsString()
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
  @IsIn([UserRoleEnum.User, UserRoleEnum.CompanyOwner])
  role: UserRoleEnum.User | UserRoleEnum.CompanyOwner;
}
