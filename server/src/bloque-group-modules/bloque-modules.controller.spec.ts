import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { ModuleEntity } from '../module/entity/module.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { standardResponse } from '../utils/mocks/standard-response.mock';
import { BloqueModulesController } from './bloque-modules.controller';
import { BloqueModulesService } from './bloque-modules.service';
import { BloqueGroupModulesEntity } from './entity/bloque-modules.entity';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';
import { EventsEntity } from '../events/entity/events.entity';
import { EventsService } from '../events/events.service';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { ProfessorsToGroups } from '../professorsToGroups/entity/professorsToGroups.entity';

describe('BloqueModulesController', () => {
  let controller: BloqueModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BloqueModulesController],
      providers: [
        EventsService,
        {
          provide: JwtStrategy,
          useValue: {
            secretOrPrivateKey: 'secret',
          },
        },
        {
          provide: BloqueModulesService,
          useValue: {
            create: jest.fn().mockResolvedValue(standardResponse),
            findWithGroup: jest.fn().mockResolvedValue(standardResponse),
            remove: jest.fn().mockResolvedValue(standardResponse),
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
        {
          provide: getRepositoryToken(ProfessorsEntity),
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
          provide: getRepositoryToken(EventsEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BloqueModulesController>(BloqueModulesController);
  });

  describe('create', () => {
    it('should send back the response of the service', async () => {
      expect(
        await controller.create({
          groupId: 'uuid',
          moduleId: ['uuid'],
        }),
      ).toEqual(standardResponse);
    });
  });

  describe('findAll', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.findAll('uuid')).toEqual(standardResponse);
    });
  });

  describe('remove', () => {
    it('should send back the response of the service', async () => {
      expect(await controller.remove('id')).toEqual(standardResponse);
    });
  });
});
