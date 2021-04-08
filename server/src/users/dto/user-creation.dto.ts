import { IsNotEmpty, IsEmail } from 'class-validator';

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
