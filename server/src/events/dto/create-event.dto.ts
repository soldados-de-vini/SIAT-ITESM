import { ApiProperty } from '@nestjs/swagger';
import { BaseEventDto } from './base-event.dto';

export class CreateEventDto {
  @ApiProperty()
  groupId: string;

  @ApiProperty()
  bloqueGroupId: string;

  @ApiProperty()
  events: BaseEventDto[];
}
