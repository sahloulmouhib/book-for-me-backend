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
import { ServicesModule } from './services/services.module';
import { Service } from './services/service.entity';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: env.DB_TYPE as any,
          host: env.DB_HOST,
          port: parseInt(env.DB_PORT),
          username: env.DB_USERNAME,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
          entities: [User, Booking, Company, Availability, Service],
          synchronize: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid data source options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UsersModule,
    AuthModule,
    BookingsModule,
    CompaniesModule,
    AvailabilitiesModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
