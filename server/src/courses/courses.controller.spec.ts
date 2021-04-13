import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersEntity } from '../users/entity/users.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entity/course.entity';
import { mockCourseDto } from '../utils/mocks/courses.mock';
import { PassportModule } from '@nestjs/passport';

describe('CoursesController', () => {
  const standardResponse = {
    status: {
      statusCode: HttpStatus.OK,
      message: 'Success.',
    },
  };
  const jwtRequest = { user: { id: 'uuid' } };
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [CoursesController],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: CoursesService,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockReturnValue(standardResponse),
            update: jest.fn().mockReturnValue(standardResponse),
            remove: jest.fn().mockReturnValue(standardResponse),
          },
        },
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
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

    controller = module.get<CoursesController>(CoursesController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, { courses: [mockCourseDto] }),
      ).toEqual(standardResponse);
    });
  });

  describe('findAll', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.findAll(jwtRequest)).toEqual(standardResponse);
    });
  });

  describe('update', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.update(jwtRequest, 'id', mockCourseDto)).toEqual(
        standardResponse,
      );
    });
  });

  describe('remove', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.remove(jwtRequest, 'id')).toEqual(
        standardResponse,
      );
    });
  });
});
