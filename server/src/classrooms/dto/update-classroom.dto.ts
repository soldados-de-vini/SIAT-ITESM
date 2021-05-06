import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateClassroomDto {
  @ApiProperty()
  @IsNotEmpty()
  building: string;

  @ApiProperty()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  school: string;

  @ApiProperty()
  entrance: string;

  @ApiProperty()
  currenDiv: string;

  @ApiProperty()
  administrator: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
