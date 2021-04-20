import { Test, TestingModule } from '@nestjs/testing';
import { UsersEntity } from '../users/entity/users.entity';
import { MockType } from '../utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { mockProfessorDto } from '../utils/mocks/professors.mock';
import { baseEntity } from '../utils/mocks/users.mock';
import { ProfessorsEntity } from './entity/professors.entity';
import { CreateProfessorsReq } from './interfaces/createProfessorsReq';
import { ProfessorsService } from './professors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';

describe('ProfessorsService', () => {
  const sampleUser = baseEntity;
  const sampleProfessor = mockProfessorDto;
  const sampleCreateReq: CreateProfessorsReq = {
    professors: [sampleProfessor],
  };
  let service: ProfessorsService;
  let professorsRepository: MockType<Repository<ProfessorsEntity>>;
  let userRepository: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorsService,
        {
          provide: getRepositoryToken(ProfessorsEntity),
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
      ],
    }).compile();

    service = module.get<ProfessorsService>(ProfessorsService);
    professorsRepository = module.get(getRepositoryToken(ProfessorsEntity));
    userRepository = module.get(getRepositoryToken(UsersEntity));
  });

  describe('create', () => {
    it('should create professors', async () => {
      const professorWithId = { id: 'uuid', ...sampleProfessor };
      userRepository.findOne.mockReturnValue(sampleUser);
      professorsRepository.create.mockReturnValue(professorWithId);
      expect(await service.create(sampleCreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: [professorWithId],
      });
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(professorsRepository.create).toHaveBeenCalledWith(sampleProfessor);
    });

    it('should respond with 204 status code if no data is provided', async () => {
      const emptyReq: CreateProfessorsReq = {
        professors: [],
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
    it('should retrieve professors of the user', async () => {
      userRepository.findOne.mockReturnValue({
        ...sampleUser,
        professors: sampleProfessor,
      });
      expect(await service.findAll('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user data successfully.',
        },
        result: sampleProfessor,
      });
      expect(userRepository.findOne).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the user', async () => {
      const userId = 'uuid';
      professorsRepository.findOne.mockReturnValue({
        ...mockProfessorDto,
        user: { id: userId },
      });
      professorsRepository.save.mockReturnValue({});
      expect(await service.update(userId, 'id', mockProfessorDto)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: {},
      });
    });

    it("should fail when user tries to update a professor it doesn't own", async () => {
      professorsRepository.findOne.mockReturnValue({
        ...mockProfessorDto,
        user: { id: 'ID22' },
      });
      expect(await service.update('ID11', 'id', mockProfessorDto)).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized update.',
        },
      });
    });

    it('should fail if the professor that tries to update does not exist', async () => {
      professorsRepository.findOne.mockReturnValue(null);
      expect(await service.update('uuid', 'id', mockProfessorDto)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the professor', async () => {
      const userId = 'uuid';
      professorsRepository.findOne.mockReturnValue({
        ...mockProfessorDto,
        user: { id: userId },
      });
      professorsRepository.delete.mockReturnValue({});
      expect(await service.remove(userId, 'id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should prevent deletion of professor that doesn't belong to the user", async () => {
      professorsRepository.findOne.mockReturnValue({
        ...mockProfessorDto,
        user: { id: 'ID11' },
      });
      professorsRepository.delete.mockReturnValue({});
      expect(await service.remove('ID22', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized deletion.',
        },
      });
    });

    it("should fail to delete the professor if it doesn't exist", async () => {
      professorsRepository.findOne.mockReturnValue(null);
      professorsRepository.delete.mockReturnValue({});
      expect(await service.remove('id', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
