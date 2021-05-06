import { ApiProperty } from '@nestjs/swagger';
import { BloqueGroupDto } from '../dto/bloque-group.dto';

export class CreateBloqueGroupReq {
  @ApiProperty()
  groups: BloqueGroupDto[];

  @ApiProperty()
  course21Id: string;

  @ApiProperty()
  periodId: string;
}
