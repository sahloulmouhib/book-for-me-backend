import { CommonEntity } from 'src/shared/common.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Availability } from '../availabilities/availability.entity';
import { Service } from 'src/services/service.entity';

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

  @Column()
  description: string;

  @OneToMany(() => Availability, (availability) => availability.company)
  availabilities: Availability[];

  @OneToMany(() => Service, (service) => service.company)
  services: Service[];

  @Column({ default: null })
  image: string | null;
}
