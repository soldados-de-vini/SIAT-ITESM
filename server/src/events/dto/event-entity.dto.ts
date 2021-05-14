import { ApiProperty } from '@nestjs/swagger';
import { BaseEventDto } from './base-event.dto';

export class EventDto extends BaseEventDto {
  @ApiProperty()
  id: string;
}
