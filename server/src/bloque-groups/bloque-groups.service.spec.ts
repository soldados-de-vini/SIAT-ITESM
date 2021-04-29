import { Test, TestingModule } from '@nestjs/testing';
import { mockBloqueGroupDto } from '../utils/mocks/bloque_groups.mock';
import { MockType } from '../utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { BloqueGroupsService } from './bloque-groups.service';
import { CreateBloqueGroupReq } from './interfaces/create-req-group.interface';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { BloqueGroupsEntity } from './entity/bloqueGroups.entity';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCourse21Dto } from '../utils/mocks/courses21.mock';
import { mockPeriodDto } from '../utils/mocks/periods.mock';
import { HttpStatus } from '@nestjs/common';

describe('BloqueGroupsService', () => {
  const sampleGroup = mockBloqueGroupDto;
  const sampleCreateReq: CreateBloqueGroupReq = {
    periodId: 'id',
    course21Id: 'id',
    groups: [sampleGroup],
  };
  let service: BloqueGroupsService;
  const groupDtoWithId = {
    id: 'uuid',
    ...sampleGroup,
    course21Id: 'id',
    periodId: 'id',
  };
  const groupEntity = {
    startDateString: sampleGroup.startDate,
    endDateString: sampleGroup.endDate,
    ...groupDtoWithId,
  };
  const foundGroup = {
    ...groupEntity,
    course21: { id: 'id' },
    period: { id: 'id' },
  };

  let periodRepository: MockType<Repository<PeriodsEntity>>;
  let groupRepository: MockType<Repository<BloqueGroupsEntity>>;
  let courseRepository: MockType<Repository<Course21Entity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BloqueGroupsService,
        {
          provide: getRepositoryToken(BloqueGroupsEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            push: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PeriodsEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Course21Entity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BloqueGroupsService>(BloqueGroupsService);
    periodRepository = module.get(getRepositoryToken(PeriodsEntity));
    groupRepository = module.get(getRepositoryToken(BloqueGroupsEntity));
    courseRepository = module.get(getRepositoryToken(Course21Entity));
  });

  describe('create', () => {
    it('should create groups', async () => {
      const additionalAttributes = { id: 'id', bloqueGroups: [] };
      courseRepository.findOne.mockReturnValue({
        ...mockCourse21Dto,
        ...additionalAttributes,
      });
      periodRepository.findOne.mockReturnValue({
        ...mockPeriodDto,
        ...additionalAttributes,
      });
      groupRepository.create.mockReturnValue(groupEntity);
      expect(await service.create(sampleCreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Created successfully.',
        },
        result: [groupDtoWithId],
      });
      expect(courseRepository.findOne).toHaveBeenCalled();
      expect(periodRepository.findOne).toHaveBeenCalled();
      expect(groupRepository.create).toHaveBeenCalledWith(sampleGroup);
    });

    it('should respond with 204 status code if no data is provided', async () => {
      const emptyReq: CreateBloqueGroupReq = {
        periodId: 'puid',
        course21Id: 'ciud',
        groups: [],
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
    it('should retrieve groups of the period', async () => {
      groupRepository.find.mockReturnValue([foundGroup]);
      expect(await service.findAll('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successful search',
        },
        result: [groupDtoWithId],
      });
      expect(groupRepository.find).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the group', async () => {
      groupRepository.findOne.mockReturnValue(foundGroup);
      groupRepository.save.mockImplementation((entity) => entity);
      expect(await service.update('id', sampleGroup)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: { ...groupDtoWithId },
      });
    });

    it('should fail if the group that tries to update does not exist', async () => {
      periodRepository.findOne.mockReturnValue(null);
      expect(await service.update('id', sampleGroup)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the group', async () => {
      groupRepository.findOne.mockReturnValue(foundGroup);
      groupRepository.delete.mockReturnValue({});
      expect(await service.remove('id')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successfully deleted.',
        },
      });
    });

    it("should fail to delete the period if it doesn't exist", async () => {
      groupRepository.findOne.mockReturnValue(null);
      groupRepository.delete.mockReturnValue({});
      expect(await service.remove('id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Entity to delete has not been found.',
        },
      });
    });
  });
});
