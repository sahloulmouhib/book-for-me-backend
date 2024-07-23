import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth.constants';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    CompaniesModule,
    JwtModule.register({
      global: true,
      secret: jwtConfig.SECRET,
      signOptions: { expiresIn: jwtConfig.EXPIRES_IN },
    }),
  ],
})
export class AuthModule {}
