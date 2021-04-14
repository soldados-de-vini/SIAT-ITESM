import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { Repository } from 'typeorm';
import { MockType } from '../utils/mocks/mock-type';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entity/course.entity';
import { mockUserEntityNoCourses } from '../utils/mocks/users.mock';
import { mockCourseDto } from '../utils/mocks/courses.mock';
import { HttpStatus } from '@nestjs/common';

describe('CoursesService', () => {
  const sampleCourse = mockCourseDto;
  const sampleCourseCreateReq = {
    courses: [sampleCourse],
  };
  let sampleUser: UsersEntity;
  let service: CoursesService;
  let courseRepository: MockType<Repository<CourseEntity>>;
  let userRepository: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(CourseEntity),
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

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get(getRepositoryToken(CourseEntity));
    userRepository = module.get(getRepositoryToken(UsersEntity));
    sampleUser = mockUserEntityNoCourses;
  });

  describe('create', () => {
    it('should create a courses', async () => {
      const courseWithId = { id: 'uuid', ...sampleCourse };
      userRepository.findOne.mockReturnValue(sampleUser);
      courseRepository.create.mockReturnValue(courseWithId);
      expect(await service.create(sampleCourseCreateReq, 'uuid')).toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Courses successfully created.',
        },
        result: [courseWithId],
      });
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(courseRepository.create).toHaveBeenCalledWith(sampleCourse);
    });
  });

  describe('findAll', () => {
    it('should retrieve courses of the user', async () => {
      userRepository.findOne.mockReturnValue({
        ...sampleUser,
        courses: sampleCourse,
      });
      expect(await service.findAll('uuid')).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Searched user courses successfully.',
        },
        result: sampleCourse,
      });
      expect(userRepository.findOne).toBeCalled();
    });
  });

  describe('update', () => {
    it('should properly update the user', async () => {
      const userId = 'uuid';
      courseRepository.findOne.mockReturnValue({
        ...mockCourseDto,
        user: { id: userId },
      });
      courseRepository.save.mockReturnValue({});
      expect(await service.update(userId, 'id', mockCourseDto)).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Course updated successfully.',
        },
        result: {},
      });
    });

    it("should fail when user tries to update a course it doesn't own", async () => {
      courseRepository.findOne.mockReturnValue({
        ...mockCourseDto,
        user: { id: 'ID22' },
      });
      expect(await service.update('ID11', 'id', mockCourseDto)).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unathorized update.',
        },
      });
    });

    it('should fail if the course that tries to update does not exist', async () => {
      courseRepository.findOne.mockReturnValue(null);
      expect(await service.update('uuid', 'id', mockCourseDto)).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Course to update has not been found.',
        },
      });
    });
  });

  describe('remove', () => {
    it('should properly delete the course', async () => {
      const userId = 'uuid';
      courseRepository.findOne.mockReturnValue({
        ...mockCourseDto,
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
        ...mockCourseDto,
        user: { id: 'ID11' },
      });
      courseRepository.delete.mockReturnValue({});
      expect(await service.remove('ID22', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unathorized deletion.',
        },
      });
    });

    it("should fail to delete the course if it doesn't exist", async () => {
      courseRepository.findOne.mockReturnValue(null);
      courseRepository.delete.mockReturnValue({});
      expect(await service.remove('id', 'id')).toEqual({
        status: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Course to delete has not been found.',
        },
      });
    });
  });
});
