import { env } from 'process';
import { config } from 'dotenv';
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
    MAX_LENGTH: 16,
  },
};
