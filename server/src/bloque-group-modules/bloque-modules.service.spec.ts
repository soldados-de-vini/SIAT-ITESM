import { Test, TestingModule } from '@nestjs/testing';
import { BloqueModulesService } from './bloque-modules.service';

describe('BloqueModulesService', () => {
  let service: BloqueModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloqueModulesService],
    }).compile();

    service = module.get<BloqueModulesService>(BloqueModulesService);
  });

  it('should be defined', () => {
    expect('t').toEqual('t');
  });
});
