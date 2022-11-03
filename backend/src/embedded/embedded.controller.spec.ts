import { Test, TestingModule } from '@nestjs/testing';
import { EmbeddedController } from './embedded.controller';

describe('EmbeddedController', () => {
  let controller: EmbeddedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmbeddedController],
    }).compile();

    controller = module.get<EmbeddedController>(EmbeddedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
