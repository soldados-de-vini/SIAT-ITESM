import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UsersEntity } from './entity/users.entity';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/user-creation.dto';
import { UserInfoDTO } from './dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Searches for one user in the database that matches the given options.
   * @param options The options needed to distinguish the user.
   * @returns If found, returns the whole information in the DB of the user, otherwise returns null.
   */
  async findOne(options?: FindOneOptions): Promise<UserInfoDTO> {
    const user = await this.usersRepository.findOne(options);
    if (user) {
      return this._toUserInfoDTO(user);
    }
    return null;
  }

  /**
   * Creates a new user in the database.
   * If the user already exists, it throws an Exception.
   * @param userDto The data to be added in the database.
   * @returns The information created of the user.
   */
  async create(userDto: CreateUserDTO): Promise<UserDTO> {
    const { nomina, email, name, password } = userDto;
    // If either the email or nomina of the user is already registered,
    // we reject the request.
    const userInDb = await this.findOne({
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

  /**
   * Extracts from the given UsersEntity data the information to create a UserDTO object.
   * @param data A UsersEntity object.
   * @returns A UserDTO object of the data.
   */
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

  /**
   * Extracts from the given UsersEntity data the information to create a UserInfoDTO object.
   * @param data A UsersEntity object.
   * @returns A UserInfoDTO object of the data.
   */
  private _toUserInfoDTO(data: UsersEntity) {
    const { id, nomina, email, name, password } = data;
    const user: UserInfoDTO = {
      id,
      email,
      nomina,
      name,
      hash: password,
    };
    return user;
  }
}
