import { Injectable } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Update } from './entities/update.entity';
import { Play } from '../plays/entities/play.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private updatesRepository: Repository<Update>,
  ) {}

  async create(createUpdateDto: CreateUpdateDto) {
    const { health, deaths, gunId, shots_fired, matchId } = createUpdateDto;
    await this.updatesRepository.insert({
      health,
      deaths,
      shots_fired,
      timestamp: new Date(),
      play: {
        matchId,
        gunId,
      },
    });
  }

  findAll() {
    return `This action returns all updates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} update`;
  }

  update(id: number, updateUpdateDto: UpdateUpdateDto) {
    return `This action updates a #${id} update`;
  }

  remove(id: number) {
    return `This action removes a #${id} update`;
  }

  async getLastStats(play: Play) {
    return this.updatesRepository.findOne({
      where: {
        play,
      },
      order: {
        timestamp: 'DESC',
      },
    });
  }
}
