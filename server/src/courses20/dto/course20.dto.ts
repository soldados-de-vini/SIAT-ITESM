import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Course20Dto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  initialWeek: number;

  @ApiProperty()
  @IsNotEmpty()
  weeks: number;

  @ApiProperty()
  @IsNotEmpty()
  udc: number;

  @ApiProperty()
  semester: string;

  @ApiProperty()
  avenue: string[];

  @ApiProperty()
  typeUF: string;
}
