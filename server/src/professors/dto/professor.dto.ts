import { IsNotEmpty } from 'class-validator';

export class ProfessorDto {
  @IsNotEmpty()
  nomina: string;

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
