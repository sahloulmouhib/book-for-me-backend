import { env } from 'process';
import { config } from 'dotenv';
import { IsStrongPasswordOptions } from 'class-validator';
config();
export const jwtConfig = {
  SECRET: env.JWT_SECRET,
  EXPIRES_IN: env.JWT_EXPIRES_IN,
  TYPE: 'Bearer',
};

export const AUTHORIZATION_HEADER_KEY = 'authorization';

export const USER_KEY = 'user';

export const SALT_SIZE = 8;
export const HASH_SIZE = 32;
export const PASSWORD_SEPARATOR = '.';

export const signUpUserValidation = {
  password: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    MIN_UPPERCASE: 1,
    MIN_LOWERCASE: 1,
    MIN_NUMBERS: 1,
    MIN_SYMBOLS: 1,
  },
};

export const strongPasswordValidation: IsStrongPasswordOptions = {
  minLength: signUpUserValidation.password.MIN_LENGTH,
  minUppercase: signUpUserValidation.password.MIN_UPPERCASE,
  minLowercase: signUpUserValidation.password.MIN_LOWERCASE,
  minNumbers: signUpUserValidation.password.MIN_NUMBERS,
  minSymbols: signUpUserValidation.password.MIN_SYMBOLS,
};

export const strongPasswordValidationMessage = `password and confirmPassword must be ${strongPasswordValidation.minLength} characters long and contain at least ${strongPasswordValidation.minUppercase} uppercase letter, ${strongPasswordValidation.minLowercase} lowercase letter, ${strongPasswordValidation.minNumbers} number and ${strongPasswordValidation.minSymbols} symbol`;
