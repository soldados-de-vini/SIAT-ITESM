import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { UsersService } from './users.service';
import { HttpException } from '@nestjs/common';
import { MockType } from '../utils/mocks/mock-type';
import { userCreateMock, userDtoMock } from '../utils/mocks/users.mock';

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
    const dto = userCreateMock;

    it('should create a single user', async () => {
      const noPassEntity = userDtoMock;
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
