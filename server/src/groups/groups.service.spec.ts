import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from '../utils/mocks/mock-type';
import { Repository } from 'typeorm';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { mockGroupDto, mockUpdateGroupDto } from '../utils/mocks/groups.mock';
import { GroupsEntity } from './entity/groups.entity';
import { GroupsService } from './groups.service';
import { CreateGroupReq } from './interfaces/create-group.interface';
import { HttpStatus } from '@nestjs/common';
import { mockCourseDto } from '../utils/mocks/courses.mock';
import { mockPeriodDto } from '../utils/mocks/periods.mock';

describe('GroupsService', () => {
  const sampleGroup = mockGroupDto;
  const sampleUpdateGroup = mockUpdateGroupDto;
  const sampleCreateReq: CreateGroupReq = {
    periodId: 'id',
    courseId: 'id',
    groups: [sampleGroup],
  };
  const groupDtoWithId = {
    id: 'uuid',
    ...sampleGroup,
    courseId: 'id',
    periodId: 'id',
  };
  const groupEntity = {
    startDateString: sampleGroup.startDate,
    endDateString: sampleGroup.endDate,
    ...groupDtoWithId,
  };
  const foundGroup = {
    ...groupEntity,
    course: { id: 'id' },
    period: { id: 'id' },
    classroom: null,
  };
  let service: GroupsService;
  let periodRepository: MockType<Repository<PeriodsEntity>>;
  let groupRepository: MockType<Repository<GroupsEntity>>;
  let courseRepository: MockType<Repository<CourseEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getRepositoryToken(GroupsEntity),
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
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    periodRepository = module.get(getRepositoryToken(PeriodsEntity));
    groupRepository = module.get(getRepositoryToken(GroupsEntity));
    courseRepository = module.get(getRepositoryToken(CourseEntity));
  });

  describe('create', () => {
    it('should create groups', async () => {
      const additionalAttributes = { id: 'id', groups: [] };
      courseRepository.findOne.mockReturnValue({
        ...mockCourseDto,
        ...additionalAttributes,
      });
      periodRepository.findOne.mockReturnValue({
        ...mockPeriodDto,
        ...additionalAttributes,
      });
      groupRepository.create.mockReturnValue(groupEntity);
      expect(await service.createGroup(sampleCreateReq, 'uuid')).toEqual({
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
      const emptyReq: CreateGroupReq = {
        periodId: 'puid',
        courseId: 'ciud',
        groups: [],
      };
      expect(await service.createGroup(emptyReq, 'uuid')).toEqual({
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
        result: [{ ...groupDtoWithId, classroom: null }],
      });
      expect(groupRepository.find).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the group', async () => {
      groupRepository.findOne.mockReturnValue(foundGroup);
      groupRepository.save.mockImplementation((entity) => entity);
      expect(await service.update('id', sampleUpdateGroup)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Updated successfully.',
        },
        result: { ...groupDtoWithId, classroom: null },
      });
    });

    it('should fail if the group that tries to update does not exist', async () => {
      periodRepository.findOne.mockReturnValue(null);
      expect(await service.update('id', sampleUpdateGroup)).toEqual({
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
