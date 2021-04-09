import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * DTO that contains all the information in the database of the user.
 */
export class UserInfoDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nomina: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  hash: string;
}
