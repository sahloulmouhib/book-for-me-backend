import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { signUpUserValidation } from '../constants';
import { UserRoleEnum } from 'src/users/user.enums';

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

  @IsIn([UserRoleEnum.User, UserRoleEnum.CompanyOwner])
  role: UserRoleEnum.User | UserRoleEnum.CompanyOwner;
}
