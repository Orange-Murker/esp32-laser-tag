import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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
    const { password, role, displayName } = updateUserDto;
    // FIXME: Should be separated out, but circular dependency
    const hash = password === '' ? '' : await bcrypt.hash(password, 10);
    await this.usersRepository.update(username, {
      password: password === '' ? undefined : hash,
      role,
      displayName,
    });
  }

  async remove(username: string): Promise<void> {
    await this.usersRepository.delete(username);
  }
}
