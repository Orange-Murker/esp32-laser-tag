import { Injectable } from '@nestjs/common';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';

@Injectable()
export class HitsService {
  create(createHitDto: CreateHitDto) {
    return 'This action adds a new hit';
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
