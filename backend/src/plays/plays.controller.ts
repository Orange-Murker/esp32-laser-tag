import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaysService } from './plays.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Post()
  create(@Body() createPlayDto: CreatePlayDto) {
    return this.playsService.create(createPlayDto);
  }

  @Get()
  findAll() {
    return this.playsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayDto: UpdatePlayDto) {
    return this.playsService.update(+id, updatePlayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playsService.remove(+id);
  }
}
