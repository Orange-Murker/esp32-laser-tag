import { Module } from '@nestjs/common';
import { GunsService } from './guns.service';
import { GunsController } from './guns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gun } from './entities/gun.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gun])],
  controllers: [GunsController],
  providers: [GunsService],
  exports: [TypeOrmModule],
})
export class GunsModule {}
