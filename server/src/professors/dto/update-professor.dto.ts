import { IsNotEmpty } from 'class-validator';

export class UpdateProfessorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  area: string[];

  coordination: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  loadLimit: number;
}
