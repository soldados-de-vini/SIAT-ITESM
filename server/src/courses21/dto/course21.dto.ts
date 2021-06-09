import { ApiProperty } from '@nestjs/swagger';

export class Course21Dto {
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
  semester: string;

  @ApiProperty()
  avenue: string[];

  @ApiProperty()
  typeUF: string;

  @ApiProperty()
  modules: string[];
}
