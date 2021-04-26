import { Test, TestingModule } from '@nestjs/testing';
import { UsersEntity } from '../users/entity/users.entity';
import { Repository } from 'typeorm';
import { MockType } from '../utils/mocks/mock-type';
import { mockPeriodDto } from '../utils/mocks/periods.mock';
import { baseEntity } from '../utils/mocks/users.mock';
import { PeriodsEntity } from './entity/periods.entity';
import { CreatePeriodsReq } from './interfaces/create-period.interface';
import { PeriodsService } from './periods.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';

describe('PeriodsService', () => {
  const sampleUser = baseEntity;
  const samplePeriod = mockPeriodDto;
  const sampleCreateReq: CreatePeriodsReq = {
    periods: [samplePeriod],
  };
  let service: PeriodsService;
  let periodRepository: MockType<Repository<PeriodsEntity>>;
  let userRepository: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeriodsService,
        {
          provide: getRepositoryToken(PeriodsEntity),
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

    service = module.get<PeriodsService>(PeriodsService);
    periodRepository = module.get(getRepositoryToken(PeriodsEntity));
    userRepository = module.get(getRepositoryToken(UsersEntity));
  });

  describe('create', () => {
    it('should create periods', async () => {
      const periodDtoWithId = { id: 'uuid', ...samplePeriod };
      const periodEntity = {
        startDateString: mockPeriodDto.startDate,
        endDateString: mockPeriodDto.endDate,
        ...periodDtoWithId,
      };
      userRepository.findOne.mockReturnValue(sampleUser);
      periodRepository.create.mockReturnValue(periodEntity);
      expect(await service.create(sampleCreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: [periodDtoWithId],
      });
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(periodRepository.create).toHaveBeenCalledWith(samplePeriod);
    });

    it('should respond with 204 status code if no data is provided', async () => {
      const emptyReq: CreatePeriodsReq = {
        periods: [],
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
    it('should retrieve periods of the user', async () => {
      userRepository.findOne.mockReturnValue({
        ...sampleUser,
        periods: samplePeriod,
      });
      expect(await service.findAll('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user data successfully.',
        },
        result: samplePeriod,
      });
      expect(userRepository.findOne).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the user', async () => {
      const userId = 'uuid';
      periodRepository.findOne.mockReturnValue({
        ...mockPeriodDto,
        user: { id: userId },
      });
      periodRepository.save.mockReturnValue({});
      expect(await service.update(userId, 'id', mockPeriodDto)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: {},
      });
    });

    it("should fail when user tries to update a period it doesn't own", async () => {
      periodRepository.findOne.mockReturnValue({
        ...mockPeriodDto,
        user: { id: 'ID22' },
      });
      expect(await service.update('ID11', 'id', mockPeriodDto)).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized update.',
        },
      });
    });

    it('should fail if the period that tries to update does not exist', async () => {
      periodRepository.findOne.mockReturnValue(null);
      expect(await service.update('uuid', 'id', mockPeriodDto)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the period', async () => {
      const userId = 'uuid';
      periodRepository.findOne.mockReturnValue({
        ...mockPeriodDto,
        user: { id: userId },
      });
      periodRepository.delete.mockReturnValue({});
      expect(await service.remove(userId, 'id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should prevent deletion of period that doesn't belong to the user", async () => {
      periodRepository.findOne.mockReturnValue({
        ...mockPeriodDto,
        user: { id: 'ID11' },
      });
      periodRepository.delete.mockReturnValue({});
      expect(await service.remove('ID22', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized deletion.',
        },
      });
    });

    it("should fail to delete the period if it doesn't exist", async () => {
      periodRepository.findOne.mockReturnValue(null);
      periodRepository.delete.mockReturnValue({});
      expect(await service.remove('id', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
