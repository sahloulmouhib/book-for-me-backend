import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRoleEnum } from './user.enums';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string, role: UserRoleEnum) {
    const user = this.repo.create({ email, password, role });
    return this.repo.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    // returns one record or null
    return this.repo.findOne({
      where: { email },
      select: {
        bookings: true,
        createdAt: true,
        email: true,
        id: true,
        updatedAt: true,
        password: true,
      },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    // returns one record or null
    return this.repo.findOneBy({ id });
  }
}
