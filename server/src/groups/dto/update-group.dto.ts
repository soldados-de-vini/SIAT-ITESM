import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty()
  groupNumber: string;

  @ApiProperty()
  matricula: string;

  @ApiProperty()
  formato: string;
}
