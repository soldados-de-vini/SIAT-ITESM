import { ApiProperty } from '@nestjs/swagger';

export class AvenuesDto {
  @ApiProperty()
  name: string;
}
