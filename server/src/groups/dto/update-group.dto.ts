import { IsNotEmpty } from 'class-validator';

export class UpdateGroupDto {
  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  matricula: string;

  formato: string;
}
