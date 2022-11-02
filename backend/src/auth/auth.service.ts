import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (await bcrypt.compare(pass, user.password)) return user;
    else return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.username,
      displayName: user.displayName,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
