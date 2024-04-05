import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/booking.entity';
import { CompanyModule } from './company/company.module';
import { Company } from './company/company.entity';
import { Availability } from './availability/availability.entity';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: env.DB_TYPE as any,
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [User, Booking, Company, Availability],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BookingsModule,
    CompanyModule,
    AvailabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
