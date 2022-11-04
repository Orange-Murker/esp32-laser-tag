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

  async create(createGunDto: CreateGunDto) {
    const { displayName, secret } = createGunDto;
    await this.gunsRepository.insert({
      displayName,
      secret,
    });
  }

  findAll() {
    return this.gunsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.gunsRepository.findOneBy({ id });
  }

  async update(id: number, updateGunDto: UpdateGunDto) {
    const { displayName, secret } = updateGunDto;
    await this.gunsRepository.update(
      { id },
      {
        displayName,
        secret: secret === '' ? undefined : secret,
      },
    );
  }

  async remove(id: number) {
    await this.gunsRepository.delete(id);
  }

  async findIdBySecret(secret: string): Promise<number | null> {
    const gun = await this.gunsRepository.findOneBy({ secret });
    return !gun ? null : gun.id;
  }
}
