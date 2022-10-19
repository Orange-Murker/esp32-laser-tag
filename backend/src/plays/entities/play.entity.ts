import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Match } from '../../matches/entities/match.entity';
import { Gun } from '../../guns/entities/gun.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@Unique(['matchId', 'player'])
export class Play {
  @PrimaryColumn()
  matchId: number;

  @PrimaryColumn()
  gunId: number;

  @ManyToOne(() => User)
  player: User;

  @Column()
  team: number;

  @ManyToOne(() => Match, (match) => match.id)
  match: Match;

  @ManyToOne(() => Gun)
  gun: Gun;
}
