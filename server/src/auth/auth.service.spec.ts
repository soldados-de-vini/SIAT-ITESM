import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../users/dto/user-creation.dto';
import { UsersEntity } from '../users/entity/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  describe('register', () => {
    const dto = new CreateUserDTO(
      'test@test.com',
      'Test 1',
      'L000000',
      'pass123',
    );
    const createSuccessResult = {
      id: 'uuid',
      email: 'test@test.com',
      name: 'Test 1',
      nomina: 'L000000',
    };

    it('should send successful message when registering unique user', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          UsersService,
          {
            provide: getRepositoryToken(UsersEntity),
            useValue: {
              findOne: jest.fn().mockReturnValue(null),
              // Empty is enough to consider it a success for the test.
              create: jest.fn().mockReturnValue(createSuccessResult),
              save: jest.fn(),
            },
          },
        ],
      }).compile();

      const service = module.get<AuthService>(AuthService);

      expect(service.register(dto)).resolves.toEqual({
        status: {
          statusCode: HttpStatus.CREATED,
          message: 'Successful registration.',
        },
        result: createSuccessResult,
      });
    });

    it('should send an error message when registering an already existing user', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          UsersService,
          {
            provide: getRepositoryToken(UsersEntity),
            useValue: {
              findOne: jest.fn().mockReturnValue({}),
              create: jest.fn().mockReturnValue({}),
              save: jest.fn(),
            },
          },
        ],
      }).compile();

      const service = module.get<AuthService>(AuthService);

      expect(service.register(dto)).resolves.toEqual({
        status: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        },
      });
    });
  });
});
