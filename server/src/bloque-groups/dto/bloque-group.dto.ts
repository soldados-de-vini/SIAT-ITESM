import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BloqueGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty()
  matricula: string;

  @ApiProperty()
  formato: string;
}
