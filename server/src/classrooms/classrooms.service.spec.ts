import { Test, TestingModule } from '@nestjs/testing';
import { mockClassroomsDto } from '../utils/mocks/classrooms.mock';
import { MockType } from '../utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { baseEntity } from '../utils/mocks/users.mock';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsEntity } from './entity/classrooms.entity';
import { CreateClassroomsReq } from './interfaces/create-classrooms-req.interface';
import { UsersEntity } from '../users/entity/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';

describe('ClassroomsService', () => {
  const sampleUser = baseEntity;
  const sampleClassroom = mockClassroomsDto;
  const sampleCreateReq: CreateClassroomsReq = {
    classrooms: [sampleClassroom],
  };
  let service: ClassroomsService;
  let classroomsRepository: MockType<Repository<ClassroomsEntity>>;
  let userRepository: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassroomsService,
        {
          provide: getRepositoryToken(ClassroomsEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            push: jest.fn(),
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
          provide: getRepositoryToken(GroupsEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PeriodsEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClassroomsService>(ClassroomsService);
    classroomsRepository = module.get(getRepositoryToken(ClassroomsEntity));
    userRepository = module.get(getRepositoryToken(UsersEntity));
  });

  describe('create', () => {
    it('should create classrooms', async () => {
      const classroomWithId = { id: 'uuid', ...sampleClassroom };
      userRepository.findOne.mockReturnValue(sampleUser);
      classroomsRepository.create.mockReturnValue(classroomWithId);
      expect(await service.create(sampleCreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: [classroomWithId],
      });
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(classroomsRepository.create).toHaveBeenCalledWith(sampleClassroom);
    });

    it('should respond with 204 status code if no data is provided', async () => {
      const emptyReq: CreateClassroomsReq = {
        classrooms: [],
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
    it('should retrieve classrooms of the user', async () => {
      userRepository.findOne.mockReturnValue({
        ...sampleUser,
        classrooms: sampleClassroom,
      });
      expect(await service.findAll('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user data successfully.',
        },
        result: sampleClassroom,
      });
      expect(userRepository.findOne).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should retrieve classrooms of the user', async () => {
      classroomsRepository.findOne.mockReturnValue(sampleClassroom);
      expect(await service.findOne('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user data successfully.',
        },
        result: sampleClassroom,
      });
      expect(classroomsRepository.findOne).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the user', async () => {
      const userId = 'uuid';
      classroomsRepository.findOne.mockReturnValue({
        ...mockClassroomsDto,
        user: { id: userId },
      });
      classroomsRepository.save.mockReturnValue({});
      expect(await service.update(userId, 'id', mockClassroomsDto)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: {},
      });
    });

    it("should fail when user tries to update a classroom it doesn't own", async () => {
      classroomsRepository.findOne.mockReturnValue({
        ...mockClassroomsDto,
        user: { id: 'ID22' },
      });
      expect(await service.update('ID11', 'id', mockClassroomsDto)).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized update.',
        },
      });
    });

    it('should fail if the classroom that tries to update does not exist', async () => {
      classroomsRepository.findOne.mockReturnValue(null);
      expect(await service.update('uuid', 'id', mockClassroomsDto)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the classroom', async () => {
      const userId = 'uuid';
      classroomsRepository.findOne.mockReturnValue({
        ...mockClassroomsDto,
        user: { id: userId },
      });
      classroomsRepository.delete.mockReturnValue({});
      expect(await service.remove(userId, 'id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should prevent deletion of classroom that doesn't belong to the user", async () => {
      classroomsRepository.findOne.mockReturnValue({
        ...mockClassroomsDto,
        user: { id: 'ID11' },
      });
      classroomsRepository.delete.mockReturnValue({});
      expect(await service.remove('ID22', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized deletion.',
        },
      });
    });

    it("should fail to delete the classroom if it doesn't exist", async () => {
      classroomsRepository.findOne.mockReturnValue(null);
      classroomsRepository.delete.mockReturnValue({});
      expect(await service.remove('id', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
