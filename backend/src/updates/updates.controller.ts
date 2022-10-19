import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';

@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Post()
  create(@Body() createUpdateDto: CreateUpdateDto) {
    return this.updatesService.create(createUpdateDto);
  }

  @Get()
  findAll() {
    return this.updatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.updatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpdateDto: UpdateUpdateDto) {
    return this.updatesService.update(+id, updateUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.updatesService.remove(+id);
  }
}
