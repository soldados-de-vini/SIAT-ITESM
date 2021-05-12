import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty()
  matricula: string;

  @ApiProperty()
  formato: string;
}
