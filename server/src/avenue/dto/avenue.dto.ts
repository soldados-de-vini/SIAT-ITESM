import { ApiProperty } from '@nestjs/swagger';

export class AvenueDto {
  @ApiProperty()
  name: string;
}
