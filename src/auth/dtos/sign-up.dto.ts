import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { signUpUserValidation } from '../constants';
import { UserRoleEnum } from 'src/users/users.enums';

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

  // eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
  @IsIn([UserRoleEnum.User, UserRoleEnum.CompanyOwner])
  role: UserRoleEnum.User | UserRoleEnum.CompanyOwner;
}
