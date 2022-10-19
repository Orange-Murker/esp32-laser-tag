import { Test, TestingModule } from '@nestjs/testing';
import { HitsService } from './hits.service';

describe('HitsService', () => {
  let service: HitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HitsService],
    }).compile();

    service = module.get<HitsService>(HitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
