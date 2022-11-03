import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { StatusUpdateDto } from './dto/status-update.dto';
import { GameStatusDto } from './dto/game-status.dto';
import { UpdatesService } from '../updates/updates.service';
import { HitsService } from '../hits/hits.service';
import { GunsService } from '../guns/guns.service';
import { PlaysService } from '../plays/plays.service';
import { MatchesService } from '../matches/matches.service';

@Controller('embedded')
export class EmbeddedController {
  constructor(
    private readonly gunsService: GunsService,
    private readonly updatesService: UpdatesService,
    private readonly hitsService: HitsService,
    private readonly playsService: PlaysService,
    private readonly matchesService: MatchesService,
  ) {}

  @Post(':secret')
  async postUpdate(
    @Body() statusUpdateDto: StatusUpdateDto,
    @Param('secret') secret: string,
  ) {
    const gunId = await this.gunsService.findIdBySecret(secret);
    if (!gunId) throw new HttpException('Unknown secret', HttpStatus.FORBIDDEN);

    const matchId = await this.playsService.getMatchForGun(gunId);
    if (!matchId)
      throw new HttpException('Not in a match', HttpStatus.FORBIDDEN);

    const { health, deaths, shotsFired } = statusUpdateDto;
    await this.updatesService.create({
      health,
      deaths,
      shotsFired,
      gunId,
      matchId,
    });

    for (const hit of statusUpdateDto.hits) {
      const { shooter, damage, kill } = hit;
      // TODO: Add check if the shooterId exists,
      // currently an exception is thrown if that's the case
      await this.hitsService.create({
        shooter,
        damage,
        kill,
        target: gunId,
        match: matchId,
      });
    }
  }

  @Get(':secret')
  async gameStatus(@Param('secret') secret: string): Promise<GameStatusDto> {
    const gunId = await this.gunsService.findIdBySecret(secret);
    if (!gunId) throw new HttpException('Unknown secret', HttpStatus.FORBIDDEN);

    const match = await this.matchesService.getCurrentMatchForGun(gunId);

    if (!match)
      return {
        game_running: false,
        team_fire: false,
        time_to_respawn: -1,
        team: [],
      };

    return {
      game_running: match.running,
      team_fire: match.options.friendlyFire,
      time_to_respawn: match.options.respawnTime,
      team: match.plays.map((play) => play.gunId),
    };
  }
}
