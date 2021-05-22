import { PassportModule } from '@nestjs/passport/dist';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { ProfessorsEntity } from './entity/professors.entity';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { jwtRequest } from '../utils/mocks/jwt-mock';
import { mockProfessorDto } from '../utils/mocks/professors.mock';
import { EventsService } from '../events/events.service';
import { EventsEntity } from '../events/entity/events.entity';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';
import { ProfessorsToGroups } from '../professorsToGroups/entity/professorsToGroups.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { ModuleEntity } from '../module/entity/module.entity';

describe('ProfessorsController', () => {
  let controller: ProfessorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ProfessorsController],
      providers: [
        EventsService,
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: ProfessorsService,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findAll: jest.fn().mockResolvedValue(standardResponse),
            update: jest.fn().mockResolvedValue(standardResponse),
            remove: jest.fn().mockResolvedValue(standardResponse),
          },
        },
        {
          provide: getRepositoryToken(ProfessorsEntity),
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
          provide: getRepositoryToken(EventsEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(GroupsEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProfessorsToBloqueModules),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProfessorsToGroups),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ClassroomsEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BloqueGroupModulesEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BloqueGroupsEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ModuleEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfessorsController>(ProfessorsController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create(jwtRequest, { professors: [mockProfessorDto] }),
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
        await controller.update(jwtRequest, 'id', mockProfessorDto),
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
