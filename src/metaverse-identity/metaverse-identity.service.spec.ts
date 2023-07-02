import { Test, TestingModule } from '@nestjs/testing';
import { MetaverseIdentityService } from './metaverse-identity.service';

describe('MetaverseIdentityService', () => {
  let service: MetaverseIdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaverseIdentityService],
    }).compile();

    service = module.get<MetaverseIdentityService>(MetaverseIdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
