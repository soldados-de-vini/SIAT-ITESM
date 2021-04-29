import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { mockBloqueGroupDto } from '../utils/mocks/bloque_groups.mock';
import { jwtRequest } from '../utils/mocks/jwt-mock';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { BloqueGroupsController } from './bloque-groups.controller';
import { BloqueGroupsService } from './bloque-groups.service';
import { BloqueGroupsEntity } from './entity/bloqueGroups.entity';

describe('BloqueGroupsController', () => {
  let controller: BloqueGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BloqueGroupsController],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: BloqueGroupsService,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockResolvedValue(standardResponse),
            update: jest.fn().mockResolvedValue(standardResponse),
            remove: jest.fn().mockResolvedValue(standardResponse),
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
          provide: getRepositoryToken(PeriodsEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
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
      ],
    }).compile();

    controller = module.get<BloqueGroupsController>(BloqueGroupsController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, {
          course21Id: 'uuid',
          periodId: 'uuid',
          groups: [mockBloqueGroupDto],
        }),
      ).toEqual(standardResponse);
    });
  });

  describe('findAll', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.findAll('uuid')).toEqual(standardResponse);
    });
  });

  describe('update', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.update('id', mockBloqueGroupDto)).toEqual(
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
