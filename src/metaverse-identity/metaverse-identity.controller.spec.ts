import { Test, TestingModule } from '@nestjs/testing';
import { MetaverseIdentityController } from './metaverse-identity.controller';

describe('MetaverseIdentityController', () => {
  let controller: MetaverseIdentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaverseIdentityController],
    }).compile();

    controller = module.get<MetaverseIdentityController>(MetaverseIdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
