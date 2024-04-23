import { Service } from 'src/services/service.entity';
import { CommonEntity } from 'src/shared/common.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Booking extends CommonEntity<Booking> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO: default value
  @Column({ type: 'timestamp', default: null })
  date: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Service, (service) => service.bookings)
  service: Service;
  // this used when we want to change the name of the column in the database
  // @JoinColumn({ referencedColumnName: 'id', name: 'serviceId' })
  @Column()
  serviceId: string;
}
