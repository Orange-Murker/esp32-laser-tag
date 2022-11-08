import { Module } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Play])],
  controllers: [PlaysController],
  providers: [PlaysService],
  exports: [TypeOrmModule],
})
export class PlaysModule {}
