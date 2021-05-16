import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseEventDto } from 'src/events/dto/base-event.dto';

export class GroupEventDataDto {
  @ApiProperty()
  @IsNotEmpty()
  classroomId: string;

  @ApiProperty()
  @IsNotEmpty()
  professorsIds: string[];

  @ApiProperty()
  @IsNotEmpty()
  professorsResponsability: number[];

  @ApiProperty()
  @IsNotEmpty()
  events: BaseEventDto[];
}
