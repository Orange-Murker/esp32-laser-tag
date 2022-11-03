import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.insert(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(username, updateUserDto);
  }

  async remove(username: string): Promise<void> {
    await this.usersRepository.delete(username);
  }
}
