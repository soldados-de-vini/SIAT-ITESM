import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mockedJwtService from '../utils/mocks/jwt-mock';
import securityUtils from '../utils/security.utils';
import {
  userCreateMock,
  userDtoMock,
  userInfoMock,
} from '../utils/mocks/users.mock';

describe('AuthService', () => {
  describe('register', () => {
    const dto = userCreateMock;
    const createSuccessResult = userDtoMock;

    it('should send successful message when registering unique user', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          UsersService,
          {
            provide: JwtService,
            useValue: mockedJwtService,
          },
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
            provide: JwtService,
            useValue: mockedJwtService,
          },
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

  describe('login', () => {
    let authService: AuthService;
    const result = userInfoMock;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          UsersService,
          {
            provide: JwtService,
            useValue: mockedJwtService,
          },
          {
            provide: getRepositoryToken(UsersEntity),
            useValue: {
              findOne: jest.fn((input) =>
                input.where.email == result.email ? result : null,
              ),
            },
          },
        ],
      }).compile();

      authService = module.get<AuthService>(AuthService);
    });

    it('should return user if credentials are correct', async () => {
      const comparePassSpy = jest
        .spyOn(securityUtils, 'comparePass')
        .mockResolvedValue(true);
      expect(
        await authService.login({
          email: 'test@test.com',
          password: 'pass123',
        }),
      ).toEqual({
        status: {
          statusCode: HttpStatus.OK,
          message: 'Successful login',
        },
        result: {
          access_token: 'secret',
        },
      });
      expect(comparePassSpy).toBeCalled();
    });

    it('should return unsuccessful when the user does not exist', async () => {
      expect(
        await authService.login({
          email: 'invalid@test.com',
          password: 'pass123',
        }),
      ).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        },
      });
    });

    it('should return unsuccessful when the password is incorrect', async () => {
      const comparePassSpy = jest
        .spyOn(securityUtils, 'comparePass')
        .mockResolvedValue(false);
      expect(
        await authService.login({
          email: 'test@test.com',
          password: 'invalid',
        }),
      ).toEqual({
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        },
      });
      expect(comparePassSpy).toBeCalled();
    });
  });
});
