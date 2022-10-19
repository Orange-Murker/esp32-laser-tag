import { Test, TestingModule } from '@nestjs/testing';
import { PlaysController } from './plays.controller';
import { PlaysService } from './plays.service';

describe('PlaysController', () => {
  let controller: PlaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaysController],
      providers: [PlaysService],
    }).compile();

    controller = module.get<PlaysController>(PlaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
