import { CommonEntity } from 'src/shared/common.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Company } from '../company/company.entity';
import { WeekdayEnum } from 'src/enums';

@Entity()
export class Availability extends CommonEntity<Availability> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column({ type: 'enum', enum: WeekdayEnum })
  weekDay: WeekdayEnum;

  @ManyToOne(() => Company, (company) => company.availabilities)
  company: Company;

  @Column()
  companyId: string;
}
