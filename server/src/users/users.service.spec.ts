import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/user-creation.dto';
import { HttpException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<UsersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            findOne: jest.fn((entity) => entity),
            create: jest.fn((entity) => entity),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(UsersEntity));
  });

  describe('findOne', () => {
    it('should find one user', async () => {
      const user = { email: 'hello@test.com' };
      repositoryMock.findOne.mockReturnValue(user);
      expect(await service.findOne({ where: user.email })).toEqual(user);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: user.email,
      });
    });
  });

  describe('create', () => {
    const dto = new CreateUserDTO(
      'test@test.com',
      'Test 1',
      'L000000',
      'pass123',
    );

    it('should create a single user', async () => {
      const noPassEntity = {
        id: 'uuid',
        email: 'test@test.com',
        name: 'Test 1',
        nomina: 'L000000',
      };
      repositoryMock.findOne.mockReturnValue(null);
      repositoryMock.create.mockReturnValue(noPassEntity);
      expect(await service.create(dto)).toEqual(noPassEntity);
      expect(repositoryMock.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if user already exists', () => {
      repositoryMock.findOne.mockReturnValue({});
      expect(async () => {
        await service.create(dto);
      }).rejects.toThrow(HttpException);
    });
  });
});
