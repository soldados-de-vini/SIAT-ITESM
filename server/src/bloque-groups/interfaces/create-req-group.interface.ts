import { ApiProperty } from '@nestjs/swagger';
import { GroupDto } from 'src/groups/dto/group.dto';

export class CreateBloqueGroupReq {
  @ApiProperty()
  groups: GroupDto[];

  @ApiProperty()
  periodId: string;
}
