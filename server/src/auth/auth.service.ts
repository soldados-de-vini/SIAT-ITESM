import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateUserDTO } from '../users/dto/user-creation.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../users/dto/user-login.dto';
import securityUtils from '../utils/security.utils';
import { createResponseStatus } from '../utils/db/crud-entity';

/**
 * This service handles the logic of the authentication of the users to the API.
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Tries to register a new user in the database.
   * @param userDto The information provided by the user to put on the DB.
   * @returns The response to send back to the user.
   */
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

  /**
   * Handles the generation of a JWT token for the user to access protected endpoints.
   * @param user The information of the user to login in.
   * @returns The response to send back to the user.
   */
  async login(user: UserLoginDTO): Promise<ResponseStatus> {
    const dbUser = await this.usersService.findOne({
      where: { email: user.email },
    });
    // Verify that the user exists.
    if (!dbUser) {
      return createResponseStatus(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
      );
    }
    // Verify the password with the hash of the DB.
    const correctPass = await securityUtils.comparePass(
      user.password,
      dbUser.hash,
    );
    if (!correctPass) {
      return createResponseStatus(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
      );
    }
    const payload = { id: dbUser.id };
    return createResponseStatus(HttpStatus.OK, 'Successful login', {
      access_token: this.jwtService.sign(payload),
    });
  }
}
