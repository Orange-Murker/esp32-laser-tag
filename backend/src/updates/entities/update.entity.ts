import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Play } from '../../plays/entities/play.entity';

@Entity()
export class Update {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  health: number;

  @Column()
  deaths: number;

  @Column()
  shots_fired: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Play)
  @JoinColumn([
    { name: 'match', referencedColumnName: 'matchId' },
    { name: 'gun', referencedColumnName: 'gunId' },
  ])
  play: Play;
}
