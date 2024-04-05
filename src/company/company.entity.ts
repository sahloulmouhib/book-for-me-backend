import { CommonEntity } from 'src/shared/common.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Availability } from '../availability/availability.entity';

@Entity()
export class Company extends CommonEntity<Company> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.companies)
  owner: User;

  @Column({ comment: 'Owner of the company' })
  ownerId: string;

  @Column()
  title: string;

  @OneToMany(() => Availability, (availability) => availability.company)
  availabilities: Availability[];
}
