import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
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
import { EmbeddedService } from './embedded.service';

@Controller('embedded')
export class EmbeddedController {
  private readonly logger = new Logger(EmbeddedService.name);

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
  ): Promise<GameStatusDto> {
    const gunId = await this.gunsService.findIdBySecret(secret);
    if (!gunId) {
      this.logger.log('Invalid secret');
      throw new HttpException('Unknown secret', HttpStatus.FORBIDDEN);
    }

    const match = await this.matchesService.getCurrentMatchForGun(gunId);
    if (!match) {
      this.logger.log(`No match running for gun ${gunId}`);
      return {
        game_running: false,
        team_fire: false,
        time_to_respawn: -1,
        team: [],
      };
    }

    this.logger.log('New gun update', statusUpdateDto);

    const { health, deaths, shots_fired } = statusUpdateDto;
    await this.updatesService.create({
      health,
      deaths,
      shots_fired,
      gunId,
      matchId: match.id,
    });

    for (const hit of statusUpdateDto.hits) {
      const { shooter, damage, kill } = hit;
      // TODO: Add check if the shooterId exists,
      // currently an exception is thrown if that's the case
      await this.hitsService.create({
        shooter,
        damage,
        kill: kill ?? false,
        target: gunId,
        match: match.id,
      });
    }

    return {
      game_running: match.running,
      team_fire: match.options.friendlyFire,
      time_to_respawn: match.options.respawnTime,
      team: match.plays.map((play) => play.gunId),
    };
  }
}
