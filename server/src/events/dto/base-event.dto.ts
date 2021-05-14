import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { WeekDay } from '../entity/events.entity';

export class BaseEventDto {
  @ApiProperty()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty()
  @IsNotEmpty()
  weekDay: WeekDay;
}
