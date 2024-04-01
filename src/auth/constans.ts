import { env } from 'process';
import { config } from 'dotenv';
config();
export const jwtConfig = {
  SECRET: env.JWT_SECRET,
  EXPIRES_IN: '60s',
};
