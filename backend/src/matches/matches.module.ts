import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { UpdatesModule } from '../updates/updates.module';
import { UpdatesService } from '../updates/updates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), UpdatesModule],
  controllers: [MatchesController],
  providers: [MatchesService, UpdatesService],
  exports: [TypeOrmModule],
})
export class MatchesModule {}
