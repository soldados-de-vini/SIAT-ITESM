import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GroupDto } from '../dto/group.dto';

export class CreateGroupReq {
  @ApiProperty()
  @IsNotEmpty()
  groups: GroupDto[];

  @ApiProperty()
  @IsNotEmpty()
  periodId: string;
}
