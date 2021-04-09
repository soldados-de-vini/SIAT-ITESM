import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * DTO used for the generation of the JWT token of the user.
 */
export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
