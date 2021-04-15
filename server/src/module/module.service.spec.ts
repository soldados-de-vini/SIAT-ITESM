import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from '../utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { ModuleEntity } from './entity/module.entity';
import { ModuleService } from './module.service';
import { mockUserEntityNoCourses } from '../utils/mocks/users.mock';
import { ModuleDto } from './dto/module.dto';
import { CreateModuleReq } from './interface/create-module.interface';
import { HttpStatus } from '@nestjs/common';
import { mockModuleDto } from '../utils/mocks/modules.mock';

describe('ModuleService', () => {
  const sampleUser = mockUserEntityNoCourses;
  const sampleModule = ModuleDto;
  const sampleModuleCreateReq: CreateModuleReq = {
    modules: [sampleModule],
  };
  let service: ModuleService;
  let moduleRepository: MockType<Repository<ModuleEntity>>;
  let userRepository: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleService,
        {
          provide: getRepositoryToken(ModuleEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ModuleService>(ModuleService);
    moduleRepository = module.get(getRepositoryToken(ModuleEntity));
    userRepository = module.get(getRepositoryToken(UsersEntity));
  });

  describe('create', () => {
    it('should create modules', async () => {
      const moduleWithId = { id: 'uuid', ...sampleModule };
      userRepository.findOne.mockReturnValue(sampleUser);
      moduleRepository.create.mockReturnValue(moduleWithId);
      expect(await service.create(sampleModuleCreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: [moduleWithId],
      });
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(moduleRepository.create).toHaveBeenCalledWith(sampleModule);
    });

    it('should respond with 204 status code if no data is provided', async () => {
      const emptyReq: CreateModuleReq = {
        modules: [],
      };
      expect(await service.create(emptyReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.NO_CONTENT,
          message: 'No create data was provided.',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should retrieve modules of the user', async () => {
      userRepository.findOne.mockReturnValue({
        ...sampleUser,
        modules: sampleModule,
      });
      expect(await service.findAll('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user data successfully.',
        },
        result: sampleModule,
      });
      expect(userRepository.findOne).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the user', async () => {
      const userId = 'uuid';
      moduleRepository.findOne.mockReturnValue({
        ...mockModuleDto,
        user: { id: userId },
      });
      moduleRepository.save.mockReturnValue({});
      expect(await service.update(userId, 'id', mockModuleDto)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: {},
      });
    });

    it("should fail when user tries to update a module it doesn't own", async () => {
      moduleRepository.findOne.mockReturnValue({
        ...mockModuleDto,
        user: { id: 'ID22' },
      });
      expect(await service.update('ID11', 'id', mockModuleDto)).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized update.',
        },
      });
    });

    it('should fail if the module that tries to update does not exist', async () => {
      moduleRepository.findOne.mockReturnValue(null);
      expect(await service.update('uuid', 'id', mockModuleDto)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the module', async () => {
      const userId = 'uuid';
      moduleRepository.findOne.mockReturnValue({
        ...mockModuleDto,
        user: { id: userId },
      });
      moduleRepository.delete.mockReturnValue({});
      expect(await service.remove(userId, 'id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should prevent deletion of module that doesn't belong to the user", async () => {
      moduleRepository.findOne.mockReturnValue({
        ...mockModuleDto,
        user: { id: 'ID11' },
      });
      moduleRepository.delete.mockReturnValue({});
      expect(await service.remove('ID22', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized deletion.',
        },
      });
    });

    it("should fail to delete the module if it doesn't exist", async () => {
      moduleRepository.findOne.mockReturnValue(null);
      moduleRepository.delete.mockReturnValue({});
      expect(await service.remove('id', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
