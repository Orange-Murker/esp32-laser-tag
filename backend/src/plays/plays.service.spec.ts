import { Test, TestingModule } from '@nestjs/testing';
import { PlaysService } from './plays.service';

describe('PlaysService', () => {
  let service: PlaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaysService],
    }).compile();

    service = module.get<PlaysService>(PlaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
