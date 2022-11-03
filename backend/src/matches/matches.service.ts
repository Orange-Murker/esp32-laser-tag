import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { UpdatesService } from '../updates/updates.service';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
    private readonly updatesService: UpdatesService,
  ) {}

  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  findAll() {
    return `This action returns all matches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }

  async getCurrentMatchForGun(gunId: number) {
    return this.matchesRepository.findOne({
      relations: {
        plays: true,
      },
      where: {
        running: true,
        plays: {
          gunId,
        },
      },
    });
  }

  async getActive() {
    const matches = await this.matchesRepository.find({
      relations: {
        plays: {
          player: true,
        },
      },
      where: {
        running: true,
      },
    });
    if (matches.length === 0) return null;
    const { id, options, running, plays } = matches[0];

    const players = [];
    for (const play of plays) {
      const stats = await this.updatesService.getLastStats(play);
      players.push({
        username: play.player.username,
        displayName: play.player.displayName,
        team: play.team,
        stats,
        gunId: play.gunId,
      });
    }

    return {
      id: id,
      options: options,
      running: running,
      players: players,
    };
  }
}
