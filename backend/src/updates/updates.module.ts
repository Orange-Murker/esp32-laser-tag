import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Update } from './entities/update.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Update])],
  controllers: [UpdatesController],
  providers: [UpdatesService],
  exports: [TypeOrmModule],
})
export class UpdatesModule {}
