import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Play } from '../../plays/entities/play.entity';

@Entity()
export class Hit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  damage: number;

  @Column()
  timestamp: Date;

  @Column()
  kill: boolean;

  @ManyToOne(() => Play)
  @JoinColumn([
    { name: 'match', referencedColumnName: 'matchId' },
    { name: 'shooter', referencedColumnName: 'gunId' },
  ])
  shooter: Play;

  @ManyToOne(() => Play)
  @JoinColumn([
    { name: 'match', referencedColumnName: 'matchId' },
    { name: 'target', referencedColumnName: 'gunId' },
  ])
  target: Play;
}
