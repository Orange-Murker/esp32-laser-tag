import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GunsService } from './guns.service';
import { CreateGunDto } from './dto/create-gun.dto';
import { UpdateGunDto } from './dto/update-gun.dto';

@Controller('guns')
export class GunsController {
  constructor(private readonly gunsService: GunsService) {}

  @Post()
  async create(@Body() createGunDto: CreateGunDto) {
    await this.gunsService.create(createGunDto);
    return {};
  }

  @Get()
  findAll() {
    return this.gunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gunsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGunDto: UpdateGunDto) {
    await this.gunsService.update(+id, updateGunDto);
    return { success: true };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gunsService.remove(+id);
  }
}
