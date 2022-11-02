import { User } from '../entities/user.entity';
import { Role } from '../entities/role.enum';

export class CreateUserDto implements Omit<User, 'username'> {
  displayName: string;
  role: Role;
  password: string;
}
