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
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/companies.entity';
import { Availability } from './availabilities/availability.entity';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';
import { Service } from './services/service.entity';

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
      entities: [User, Booking, Company, Availability, Service],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BookingsModule,
    CompaniesModule,
    AvailabilitiesModule,
    ServicesModule,
  ],
  controllers: [AppController, ServicesController],
  providers: [AppService],
})
export class AppModule {}
