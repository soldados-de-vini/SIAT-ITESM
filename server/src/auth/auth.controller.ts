import { Body, Controller, Post } from '@nestjs/common';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateUserDTO } from '../users/dto/user-creation.dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from '../users/dto/user-login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({summary: 'Create a new user'})
  public async register(@Body() data: CreateUserDTO): Promise<ResponseStatus> {
    return await this.authService.register(data);
  }

  @Post('login')
  @ApiOperation({summary: 'Login user'})
  public async login(@Body() data: UserLoginDTO) {
    return this.authService.login(data);
  }
}
