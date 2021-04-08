import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UsersEntity } from './entity/users.entity';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/user-creation.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findOne(options?: FindOneOptions): Promise<UserDTO> {
    const user = await this.usersRepository.findOne(options);
    return this._toUserDTO(user);
  }

  async create(userDto: CreateUserDTO): Promise<UserDTO> {
    const { nomina, email, name, password } = userDto;
    // If either the email or nomina of the user is already registered,
    // we reject the request.
    const userInDb = await this.usersRepository.findOne({
      where: [{ email }, { nomina }],
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: UsersEntity = this.usersRepository.create({
      email,
      password,
      name,
      nomina,
    });

    await this.usersRepository.save(user);
    return this._toUserDTO(user);
  }

  private _toUserDTO(data: UsersEntity) {
    const { id, nomina, email, name } = data;
    const user: UserDTO = {
      id,
      email,
      nomina,
      name,
    };
    return user;
  }
}
