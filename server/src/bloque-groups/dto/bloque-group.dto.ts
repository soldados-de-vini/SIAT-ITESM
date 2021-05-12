import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BloqueGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  number: number;

  @ApiProperty()
  matricula: string;

  @ApiProperty()
  formato: string;
}
