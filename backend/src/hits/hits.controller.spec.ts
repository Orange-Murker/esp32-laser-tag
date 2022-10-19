import { Test, TestingModule } from '@nestjs/testing';
import { HitsController } from './hits.controller';
import { HitsService } from './hits.service';

describe('HitsController', () => {
  let controller: HitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HitsController],
      providers: [HitsService],
    }).compile();

    controller = module.get<HitsController>(HitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
