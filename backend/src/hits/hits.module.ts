import { Module } from '@nestjs/common';
import { HitsService } from './hits.service';
import { HitsController } from './hits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hit } from './entities/hit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hit])],
  controllers: [HitsController],
  providers: [HitsService],
  exports: [TypeOrmModule],
})
export class HitsModule {}
