import { IsNotEmpty } from 'class-validator';

export class Course20Dto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  capacity: number;

  @IsNotEmpty()
  initialWeek: number;

  @IsNotEmpty()
  weeks: number;

  semester: string;

  avenue: string[];

  typeUF: string;
}
