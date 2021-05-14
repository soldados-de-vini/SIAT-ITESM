import { ApiProperty } from '@nestjs/swagger';
import { BaseEventDto } from './base-event.dto';

export class CreateEventDto extends BaseEventDto {
  @ApiProperty()
  groupId: string;

  @ApiProperty()
  bloqueGroupId: string;
}
