import { Test, TestingModule } from '@nestjs/testing';
import { GunsController } from './guns.controller';
import { GunsService } from './guns.service';

describe('GunsController', () => {
  let controller: GunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GunsController],
      providers: [GunsService],
    }).compile();

    controller = module.get<GunsController>(GunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
