import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GroupDto {
  @ApiProperty()
  @IsNotEmpty()
  groupsAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  courseKey: string;

  @ApiProperty()
  matricula: string;

  @ApiProperty()
  formato: string;
}
