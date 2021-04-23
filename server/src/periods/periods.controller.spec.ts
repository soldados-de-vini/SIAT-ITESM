import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { jwtRequest } from '../utils/mocks/jwt-mock';
import { mockPeriodDto } from '../utils/mocks/periods.mock';
import { JwtStrategy } from '../auth/jwt.strategy';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { PeriodsEntity } from './entity/periods.entity';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';

describe('PeriodsController', () => {
  let controller: PeriodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [PeriodsController],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: PeriodsService,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockResolvedValue(standardResponse),
            update: jest.fn().mockResolvedValue(standardResponse),
            remove: jest.fn().mockResolvedValue(standardResponse),
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
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PeriodsController>(PeriodsController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, { periods: [mockPeriodDto] }),
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
      expect(await controller.update(jwtRequest, 'id', mockPeriodDto)).toEqual(
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
