import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { signUpUserValidation } from '../constans';

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
}
