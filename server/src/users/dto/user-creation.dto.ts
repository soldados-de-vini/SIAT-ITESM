import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * DTO used for the registration of a new user on the database.
 */
export class CreateUserDTO {
  @IsNotEmpty()
  nomina: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, name: string, nomina: string, password: string) {
    this.email = email;
    this.name = name;
    this.nomina = nomina;
    this.password = password;
  }
}
