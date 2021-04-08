import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nomina: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
