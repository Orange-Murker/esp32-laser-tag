import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  displayName: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ length: 60 })
  password: string;
}
