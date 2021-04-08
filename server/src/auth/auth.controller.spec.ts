import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../users/dto/user-creation.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const successfulRegistration = {
    statusCode: HttpStatus.CREATED,
    message: 'Successful registration.',
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
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should get an object with the status code and message', async () => {
      const dto = new CreateUserDTO(
        'test@test.com',
        'name',
        'nomina',
        'pass123',
      );
      expect(await controller.register(dto)).toEqual(successfulRegistration);
    });
  });
});
