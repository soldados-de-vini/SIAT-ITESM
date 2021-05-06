import { ApiProperty } from '@nestjs/swagger';
import { GroupDto } from '../dto/group.dto';

export class CreateGroupReq {
  @ApiProperty()
  groups: GroupDto[];
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  periodId: string;
}
