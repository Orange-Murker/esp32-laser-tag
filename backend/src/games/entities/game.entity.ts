import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from '../../matches/entities/match.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  started: Date;

  @Column({ nullable: true })
  ended: Date;

  @OneToMany(() => Match, (match) => match.game)
  matches: Match[];
}
