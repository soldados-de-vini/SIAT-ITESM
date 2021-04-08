import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateUserDTO } from '../users/dto/user-creation.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly usersService: UsersService) {}

  async register(userDto: CreateUserDTO): Promise<ResponseStatus> {
    let response: ResponseStatus = {
      status: {
        statusCode: HttpStatus.CREATED,
        message: 'Successful registration.',
      },
    };

    try {
      const newUser = await this.usersService.create(userDto);
      this.logger.log('New user created with uuid: ' + newUser.id);
      response.result = newUser;
    } catch (err) {
      response = {
        status: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
      };
    }

    return response;
  }
}
