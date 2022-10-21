import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GunsService } from './guns.service';
import { CreateGunDto } from './dto/create-gun.dto';
import { UpdateGunDto } from './dto/update-gun.dto';
import { GotShotDto } from './dto/got-shot.dto';

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

  @Get('gamestatus')
  getGameStatus(@Query('token') token: string) {
    return {
      running: true,
    };
  }

  @Post('gotshot')
  postGotShot(
    @Body() { health, deaths, shots_fired, hits }: GotShotDto,
    @Query('token') token: string,
  ) {
    console.log(
      `Received packet updates; health: ${health}, deaths: ${deaths}, shots_fired: ${shots_fired}`,
    );
    for (const { shooter, damage } of hits) {
      console.log(`Hit; shooter: ${shooter}, damage: ${damage}`);
    }
  }
}
