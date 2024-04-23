import { Booking } from 'src/bookings/booking.entity';
import { Company } from 'src/companies/companies.entity';
import { CommonEntity } from 'src/shared/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from './users.enums';

@Entity()
export class User extends CommonEntity<User> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.User,
  })
  role: UserRoleEnum;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Company, (company) => company.owner)
  companies: Company[];
}
