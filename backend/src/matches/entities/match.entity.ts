import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Play } from '../../plays/entities/play.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  options: {
    friendlyFire: boolean;
    respawnTime: number;
  };

  @Column({
    default: true,
  })
  running: boolean;

  @OneToMany(() => Play, (play) => play.match, { cascade: ['insert'] })
  plays: Play[];
}
