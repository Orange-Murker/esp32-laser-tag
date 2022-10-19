import { Test, TestingModule } from '@nestjs/testing';
import { GunsService } from './guns.service';

describe('GunsService', () => {
  let service: GunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GunsService],
    }).compile();

    service = module.get<GunsService>(GunsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
