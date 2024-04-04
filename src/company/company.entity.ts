import { CommonEntity } from 'src/shared/common.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Company extends CommonEntity<Company> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column({ comment: 'Owner of the company' })
  userId: string;

  @Column()
  title: string;
}
