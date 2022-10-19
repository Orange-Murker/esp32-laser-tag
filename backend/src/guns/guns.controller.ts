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
  create(@Body() createGunDto: CreateGunDto) {
    return this.gunsService.create(createGunDto);
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
  update(@Param('id') id: string, @Body() updateGunDto: UpdateGunDto) {
    return this.gunsService.update(+id, updateGunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gunsService.remove(+id);
  }
}
