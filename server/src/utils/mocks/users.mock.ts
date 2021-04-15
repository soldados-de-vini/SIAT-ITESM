import { UserInfoDTO } from '../../users/dto/user-info.dto';
import { UserDTO } from '../../users/dto/user.dto';
import { UsersEntity } from '../../users/entity/users.entity';
import { CreateUserDTO } from '../../users/dto/user-creation.dto';
import { UserLoginDTO } from '../../users/dto/user-login.dto';

const uuid = 'uuid';
const email = 'test@test.com';
const name = 'Test 1';
const nomina = 'L000000';
const password = 'pass123';

const userCreateMock = new CreateUserDTO();
userCreateMock.email = email;
userCreateMock.name = name;
userCreateMock.nomina = nomina;
userCreateMock.password = password;

const userLoginMock = new UserLoginDTO();
userLoginMock.email = email;
userLoginMock.password = password;

const userDtoMock = new UserDTO();
userDtoMock.id = uuid;
userDtoMock.email = email;
userDtoMock.name = name;
userDtoMock.nomina = nomina;

const userInfoMock = new UserInfoDTO();
userInfoMock.id = uuid;
userInfoMock.email = email;
userInfoMock.name = name;
userInfoMock.nomina = nomina;
userInfoMock.hash = password;

const mockUserEntityNoCourses = new UsersEntity();
mockUserEntityNoCourses.id = uuid;
mockUserEntityNoCourses.email = email;
mockUserEntityNoCourses.name = name;
mockUserEntityNoCourses.nomina = nomina;
mockUserEntityNoCourses.password = password;
mockUserEntityNoCourses.courses = [];

const mockUserEntityNoModules = new UsersEntity();
mockUserEntityNoCourses.id = uuid;
mockUserEntityNoCourses.email = email;
mockUserEntityNoCourses.name = name;
mockUserEntityNoCourses.nomina = nomina;
mockUserEntityNoCourses.password = password;
mockUserEntityNoCourses.modules = [];

export {
  userCreateMock,
  userDtoMock,
  userInfoMock,
  mockUserEntityNoCourses,
  mockUserEntityNoModules,
  userLoginMock,
};
