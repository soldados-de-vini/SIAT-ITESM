import { Test, TestingModule } from '@nestjs/testing';
import { BloqueModulesController } from './bloque-modules.controller';
import { BloqueModulesService } from './bloque-modules.service';

describe('BloqueModulesController', () => {
  let controller: BloqueModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqueModulesController],
      providers: [BloqueModulesService],
    }).compile();

    controller = module.get<BloqueModulesController>(BloqueModulesController);
  });

  it('should be defined', () => {
    expect('t').toEqual('t');
  });
});
