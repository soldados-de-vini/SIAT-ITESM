import { Test, TestingModule } from '@nestjs/testing';
import { UsersEntity } from '../users/entity/users.entity';
import { MockType } from '../utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { mockCourse21Dto } from '../utils/mocks/courses21.mock';
import { Courses21Service } from './courses21.service';
import { Course21Entity } from './entities/course21.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModuleEntity } from '../module/entity/module.entity';
import { mockModuleEntity } from '../utils/mocks/modules.mock';
import { baseEntity } from '../utils/mocks/users.mock';
import { HttpStatus } from '@nestjs/common';
import * as db from '../utils/db/crud-entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { ModuleService } from '../module/module.service';

describe('Courses21Service', () => {
  const sampleCourse21 = mockCourse21Dto;
  const sampleCourse21CreateReq = {
    courses: [sampleCourse21],
  };
  let sampleUser: UsersEntity;
  let service: Courses21Service;
  let courseRepository: MockType<Repository<Course21Entity>>;
  let userRepository: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Courses21Service,
        {
          provide: ModuleService,
          useValue: {
            findAll: jest.fn(() => []),
          },
        },
        {
          provide: getRepositoryToken(Course21Entity),
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

    service = module.get<Courses21Service>(Courses21Service);
    courseRepository = module.get(getRepositoryToken(Course21Entity));
    userRepository = module.get(getRepositoryToken(UsersEntity));
    sampleUser = baseEntity;
  });

  describe('create', () => {
    it('should create a courses', async () => {
      const courseWithId = { id: 'uuid', ...sampleCourse21, modules: [] };
      userRepository.findOne.mockReturnValue(sampleUser);
      courseRepository.create.mockReturnValue(courseWithId);
      expect(await service.create(sampleCourse21CreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: [courseWithId],
      });
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(courseRepository.create).toHaveBeenCalledWith(sampleCourse21);
    });

    it('should respond with 204 status code if no data is provided', async () => {
      const emptyReq = {
        courses: [],
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
    it('should retrieve courses of the user', async () => {
      const expectedResult = {
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user data successfully.',
        },
        result: [{ ...sampleCourse21, id: 'uuid' }],
      };
      jest.spyOn(db, 'findWithCondition').mockReturnValue(
        new Promise<ResponseStatus>((resolve) => {
          resolve(expectedResult);
        }),
      );
      userRepository.findOne.mockReturnValue({
        ...sampleUser,
        courses: sampleCourse21,
      });
      expect(await service.findAll('uuid')).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should properly update the user', async () => {
      const userId = 'uuid';
      courseRepository.findOne.mockReturnValue({
        ...mockCourse21Dto,
        user: { id: userId },
      });
      courseRepository.save.mockReturnValue({});
      expect(await service.update(userId, 'id', mockCourse21Dto)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: {},
      });
    });

    it("should fail when user tries to update a course it doesn't own", async () => {
      courseRepository.findOne.mockReturnValue({
        ...mockCourse21Dto,
        user: { id: 'ID22' },
      });
      expect(await service.update('ID11', 'id', mockCourse21Dto)).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized update.',
        },
      });
    });

    it('should fail if the course that tries to update does not exist', async () => {
      courseRepository.findOne.mockReturnValue(null);
      expect(await service.update('uuid', 'id', mockCourse21Dto)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the course', async () => {
      const userId = 'uuid';
      courseRepository.findOne.mockReturnValue({
        ...mockCourse21Dto,
        user: { id: userId },
      });
      courseRepository.delete.mockReturnValue({});
      expect(await service.remove(userId, 'id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should prevent deletion of course that doesn't belong to the user", async () => {
      courseRepository.findOne.mockReturnValue({
        ...mockCourse21Dto,
        user: { id: 'ID11' },
      });
      courseRepository.delete.mockReturnValue({});
      expect(await service.remove('ID22', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized deletion.',
        },
      });
    });

    it("should fail to delete the course if it doesn't exist", async () => {
      courseRepository.findOne.mockReturnValue(null);
      courseRepository.delete.mockReturnValue({});
      expect(await service.remove('id', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
