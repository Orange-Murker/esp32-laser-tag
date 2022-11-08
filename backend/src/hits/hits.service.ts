import { Injectable } from '@nestjs/common';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hit } from './entities/hit.entity';

@Injectable()
export class HitsService {
  constructor(
    @InjectRepository(Hit)
    private readonly hitsRepository: Repository<Hit>,
  ) {}

  async create(createHitDto: CreateHitDto) {
    const { damage, kill, shooter, target, match } = createHitDto;
    await this.hitsRepository.insert({
      damage,
      kill,
      timestamp: new Date(),
      shooter: {
        matchId: match,
        gunId: shooter,
      },
      target: {
        matchId: match,
        gunId: target,
      },
    });
  }

  findAll() {
    return `This action returns all hits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hit`;
  }

  update(id: number, updateHitDto: UpdateHitDto) {
    return `This action updates a #${id} hit`;
  }

  remove(id: number) {
    return `This action removes a #${id} hit`;
  }
}
