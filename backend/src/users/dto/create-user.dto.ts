import { User } from '../entities/user.entity';
import { Role } from '../entities/role.enum';

export class CreateUserDto implements User {
  username: string;
  displayName: string;
  role: Role;
  password: string;
}
