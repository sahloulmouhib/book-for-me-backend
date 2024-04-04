import type { DeepPartial } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity<T> {
  constructor(args?: DeepPartial<T>) {
    Object.assign(this, args);
  }

  @CreateDateColumn({
    comment: 'Date on which row was created',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: 'Last date on which row was updated',
    type: 'timestamp',
  })
  updatedAt: Date;
}
