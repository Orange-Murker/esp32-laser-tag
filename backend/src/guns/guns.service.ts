import { Injectable } from '@nestjs/common';
import { CreateGunDto } from './dto/create-gun.dto';
import { UpdateGunDto } from './dto/update-gun.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gun } from './entities/gun.entity';

@Injectable()
export class GunsService {
  constructor(
    @InjectRepository(Gun)
    private gunsRepository: Repository<Gun>,
  ) {}

  create(createGunDto: CreateGunDto) {
    return 'This action adds a new gun';
  }

  findAll() {
    return this.gunsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} gun`;
  }

  update(id: number, _updateGunDto: UpdateGunDto) {
    return `This action updates a #${id} gun`;
  }

  remove(id: number) {
    return `This action removes a #${id} gun`;
  }

  async findIdBySecret(secret: string): Promise<number | null> {
    const gun = await this.gunsRepository.findOneBy({ secret });
    return !gun ? null : gun.id;
  }
}
