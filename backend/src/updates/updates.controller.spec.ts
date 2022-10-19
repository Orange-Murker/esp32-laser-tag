import { Test, TestingModule } from '@nestjs/testing';
import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';

describe('UpdatesController', () => {
  let controller: UpdatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatesController],
      providers: [UpdatesService],
    }).compile();

    controller = module.get<UpdatesController>(UpdatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
