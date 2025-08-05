// src/app/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User|null> {
    return await this.usersRepository.findOne({
      // Properties to return. We don't want the password property.
      select: ['firstname', 'lastname', 'email'],
      where: [{ id: id }],
    });
  }

 getUserByEmail(email: string): Promise<User|null>{
  return this.usersRepository.findOneBy({ email:email})
 }  

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  deleteUser(id: number): void {
    this.usersRepository.delete(id);
  }
}
