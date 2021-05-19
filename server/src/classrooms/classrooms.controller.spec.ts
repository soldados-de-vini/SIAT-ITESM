import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClassroomsEntity } from './entity/classrooms.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { jwtRequest } from '../utils/mocks/jwt-mock';
import { mockClassroomsDto } from '../utils/mocks/classrooms.mock';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';

describe('ClassroomsController', () => {
  let controller: ClassroomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ClassroomsController],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: ClassroomsService,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockResolvedValue(standardResponse),
            findOne: jest.fn().mockResolvedValue(standardResponse),
            update: jest.fn().mockResolvedValue(standardResponse),
            remove: jest.fn().mockResolvedValue(standardResponse),
          },
        },
        {
          provide: getRepositoryToken(ClassroomsEntity),
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
          provide: getRepositoryToken(BloqueGroupsEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BloqueGroupModulesEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClassroomsController>(ClassroomsController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, {
          classrooms: [mockClassroomsDto],
        }),
      ).toEqual(standardResponse);
    });
  });

  describe('findAll', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.findAll(jwtRequest)).toEqual(standardResponse);
    });
  });

  describe('findOne', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.findOne('uuid')).toEqual(standardResponse);
    });
  });

  describe('update', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.update(jwtRequest, 'id', mockClassroomsDto),
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
