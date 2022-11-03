import { Injectable } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Update } from './entities/update.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private updatesRepository: Repository<Update>,
  ) {}

  async create(createUpdateDto: CreateUpdateDto) {
    const { health, deaths, gunId, shotsFired, matchId } = createUpdateDto;
    await this.updatesRepository.insert({
      health,
      deaths,
      shots_fired: shotsFired,
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
}
