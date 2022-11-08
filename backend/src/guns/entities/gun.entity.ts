import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  secret: string;

  @Column()
  displayName: string;
}
