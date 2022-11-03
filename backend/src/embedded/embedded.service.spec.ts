import { Test, TestingModule } from '@nestjs/testing';
import { EmbeddedService } from './embedded.service';

describe('EmbeddedService', () => {
  let service: EmbeddedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbeddedService],
    }).compile();

    service = module.get<EmbeddedService>(EmbeddedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
