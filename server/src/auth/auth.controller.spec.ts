import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userCreateMock, userLoginMock } from '../utils/mocks/users.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const successfulRegistration = {
    statusCode: HttpStatus.CREATED,
    message: 'Successful registration.',
  };
  const successfulLogin = {
    status: {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Successful login',
    },
    result: {
      access_token: 'token',
    },
  };
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue(successfulRegistration),
            login: jest.fn().mockResolvedValue(successfulLogin),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should get an object with the status code and message', async () => {
      const dto = userCreateMock;
      expect(await controller.register(dto)).toEqual(successfulRegistration);
    });
  });

  describe('login', () => {
    it('should get an object with the status code, message and payload', async () => {
      const dto = userLoginMock;
      expect(await controller.login(dto)).toEqual(successfulLogin);
    });
  });
});
