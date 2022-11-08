import { Injectable } from '@nestjs/common';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play)
    private readonly playsRepository: Repository<Play>,
  ) {}

  create(createPlayDto: CreatePlayDto) {
    return 'This action adds a new play';
  }

  findAll() {
    return `This action returns all plays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} play`;
  }

  update(id: number, updatePlayDto: UpdatePlayDto) {
    return `This action updates a #${id} play`;
  }

  remove(id: number) {
    return `This action removes a #${id} play`;
  }

  async getMatchForGun(gunId: number) {
    const play = await this.playsRepository.findOne({
      relations: { match: true },
      where: {
        gunId,
        match: {
          running: true,
        },
      },
    });
    return !play ? null : play.matchId;
  }
}
