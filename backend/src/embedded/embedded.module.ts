import { Module } from '@nestjs/common';
import { EmbeddedController } from './embedded.controller';
import { EmbeddedService } from './embedded.service';
import { UpdatesService } from '../updates/updates.service';
import { UpdatesModule } from '../updates/updates.module';
import { HitsModule } from '../hits/hits.module';
import { HitsService } from '../hits/hits.service';
import { GunsService } from '../guns/guns.service';
import { GunsModule } from '../guns/guns.module';
import { PlaysService } from '../plays/plays.service';
import { PlaysModule } from '../plays/plays.module';

@Module({
  controllers: [EmbeddedController],
  providers: [
    EmbeddedService,
    UpdatesService,
    HitsService,
    GunsService,
    PlaysService,
  ],
  imports: [UpdatesModule, HitsModule, GunsModule, PlaysModule],
})
export class EmbeddedModule {}
