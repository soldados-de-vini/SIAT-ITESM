import { ApiProperty } from '@nestjs/swagger';
import { AvenueDto } from '../dto/avenue.dto';

export class CreateAvenueReq {
  @ApiProperty()
  avenues: AvenueDto[];
}
