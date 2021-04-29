import { IsNotEmpty } from 'class-validator';

export class BloqueGroupDto {
  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  matricula: string;

  formato: string;
}
