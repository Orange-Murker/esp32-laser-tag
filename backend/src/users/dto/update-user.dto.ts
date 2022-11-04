import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../entities/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  displayName: string;
  role: Role;
  password: string;
}
