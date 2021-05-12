import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { GroupsEntity } from './entity/groups.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { jwtRequest } from '../utils/mocks/jwt-mock';
import { mockGroupDto } from '../utils/mocks/groups.mock';

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [GroupsController],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: GroupsService,
          useValue: {
            createGroup: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockResolvedValue(standardResponse),
            update: jest.fn().mockResolvedValue(standardResponse),
            remove: jest.fn().mockResolvedValue(standardResponse),
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
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, {
          courseId: 'uuid',
          periodId: 'uuid',
          groups: [mockGroupDto],
        }),
      ).toEqual(standardResponse);
    });
  });

  describe('findAll', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.find('uuid')).toEqual(standardResponse);
    });
  });

  describe('update', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.update('id', mockGroupDto)).toEqual(
        standardResponse,
      );
    });
  });

  describe('remove', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.remove('id')).toEqual(standardResponse);
    });
  });
});
