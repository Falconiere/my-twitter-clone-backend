import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';

import { Repository } from 'typeorm';
import { convertObjToEntity } from 'utilities/entities';
import { validateEntity } from 'utilities/validators';
import { UserEntity as User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const _user = convertObjToEntity<User>('UserEntity', user);
    await validateEntity(_user);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: User['id']): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async removeById(id: User['id']): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: User['id'], user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOneBy({ id });
  }

  async isUserNameAvailable(username: string) {
    const isAvailable =
      (await this.usersRepository.countBy({ username })) === 0;
    return {
      message: `The username "${username}" ${
        isAvailable ? 'is' : 'is not'
      } available`,
      isAvailable,
    };
  }
}
