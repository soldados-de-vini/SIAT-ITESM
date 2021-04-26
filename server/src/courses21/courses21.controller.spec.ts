import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCourse21Dto } from '../utils/mocks/courses21.mock';
import { jwtRequest } from '../utils/mocks/jwt-mock';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersEntity } from '../users/entity/users.entity';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { Courses21Controller } from './courses21.controller';
import { Courses21Service } from './courses21.service';
import { Course21Entity } from './entities/course21.entity';

describe('Courses21Controller', () => {
  let controller: Courses21Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [Courses21Controller],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: Courses21Service,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockReturnValue(standardResponse),
            update: jest.fn().mockReturnValue(standardResponse),
            remove: jest.fn().mockReturnValue(standardResponse),
          },
        },
        {
          provide: getRepositoryToken(Course21Entity),
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

    controller = module.get<Courses21Controller>(Courses21Controller);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, { courses: [mockCourse21Dto] }),
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
      expect(
        await controller.update(jwtRequest, 'id', mockCourse21Dto),
      ).toEqual(standardResponse);
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
