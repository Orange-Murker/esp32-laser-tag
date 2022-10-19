import { Injectable } from '@nestjs/common';
import { CreateGunDto } from './dto/create-gun.dto';
import { UpdateGunDto } from './dto/update-gun.dto';

@Injectable()
export class GunsService {
  create(createGunDto: CreateGunDto) {
    return 'This action adds a new gun';
  }

  findAll() {
    return `This action returns all guns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gun`;
  }

  update(id: number, updateGunDto: UpdateGunDto) {
    return `This action updates a #${id} gun`;
  }

  remove(id: number) {
    return `This action removes a #${id} gun`;
  }
}
