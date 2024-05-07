import { CommonEntity } from 'src/shared/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { Booking } from 'src/bookings/booking.entity';

@Entity()
export class Service extends CommonEntity<Service> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  duration: number;

  @ManyToOne(() => Company, (company) => company.services)
  company: Company;

  @Column()
  companyId: string;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Service[];
}
