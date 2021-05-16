import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseEventDto {
  @ApiProperty()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty()
  @IsNotEmpty()
  weekDay: number;
}
