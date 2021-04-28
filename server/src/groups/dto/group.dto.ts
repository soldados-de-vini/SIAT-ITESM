import { IsNotEmpty } from 'class-validator';

export class GroupDto {
  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  matricula: string;

  formato: string;
}
