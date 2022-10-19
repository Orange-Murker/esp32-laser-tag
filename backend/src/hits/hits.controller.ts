import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HitsService } from './hits.service';
import { CreateHitDto } from './dto/create-hit.dto';
import { UpdateHitDto } from './dto/update-hit.dto';

@Controller('hits')
export class HitsController {
  constructor(private readonly hitsService: HitsService) {}

  @Post()
  create(@Body() createHitDto: CreateHitDto) {
    return this.hitsService.create(createHitDto);
  }

  @Get()
  findAll() {
    return this.hitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHitDto: UpdateHitDto) {
    return this.hitsService.update(+id, updateHitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hitsService.remove(+id);
  }
}
