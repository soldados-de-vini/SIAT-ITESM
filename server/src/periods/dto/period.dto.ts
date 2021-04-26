import { IsNotEmpty } from 'class-validator';

export class PeriodDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  vacations: string[];
}
