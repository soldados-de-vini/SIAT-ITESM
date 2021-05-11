import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockBloqueGroupDto } from '../utils/mocks/bloque_groups.mock';
import { mockModuleEntity } from '../utils/mocks/modules.mock';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { ModuleEntity } from '../module/entity/module.entity';
import { BloqueModulesService } from './bloque-modules.service';
import { BloqueGroupModulesEntity } from './entity/bloque-modules.entity';
import { mockModuleGroup } from '../utils/mocks/module_group.mock';
import { MockType } from 'src/utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

describe('BloqueModulesService', () => {
  let moduleGroupRepository: MockType<Repository<BloqueGroupModulesEntity>>;
  let groupRepository: MockType<Repository<BloqueGroupsEntity>>;
  let service: BloqueModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BloqueModulesService,
        {
          provide: getRepositoryToken(BloqueGroupModulesEntity),
          useValue: {
            find: jest.fn().mockReturnValue([mockModuleGroup]),
            findOne: jest.fn().mockReturnValue(mockModuleGroup),
            save: jest.fn().mockImplementation((val) => val),
            create: jest.fn().mockReturnValue(new BloqueGroupModulesEntity()),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BloqueGroupsEntity),
          useValue: {
            findOne: jest.fn().mockReturnValue(mockBloqueGroupDto),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ModuleEntity),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockReturnValue([mockModuleEntity]),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<BloqueModulesService>(BloqueModulesService);
    moduleGroupRepository = module.get(
      getRepositoryToken(BloqueGroupModulesEntity),
    );
    groupRepository = module.get(getRepositoryToken(BloqueGroupsEntity));
  });

  describe('create', () => {
    it('should create groups', async () => {
      expect(await service.create('uuid', ['uuid'])).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: { groupId: 'uuid', groups: [{ module: mockModuleEntity }] },
      });
      expect(groupRepository.findOne).toHaveBeenCalled();
    });

    it('should respond with 204 status code if no data is provided', async () => {
      expect(await service.create('', [])).toEqual({
        status: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Data cannot be empty.',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should retrieve groups of the period', async () => {
      expect(await service.findWithGroup('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched successfully',
        },
        result: [mockModuleGroup],
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the group', async () => {
      moduleGroupRepository.findOne.mockReturnValue(mockModuleGroup);
      moduleGroupRepository.delete.mockReturnValue({});
      expect(await service.remove('id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should fail to delete the period if it doesn't exist", async () => {
      moduleGroupRepository.findOne.mockReturnValue(null);
      moduleGroupRepository.delete.mockReturnValue({});
      expect(await service.remove('id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
