import { ApiProperty } from '@nestjs/swagger';
import { PeriodDto } from '../dto/period.dto';

export class CreatePeriodsReq {
  @ApiProperty()
  periods: PeriodDto[];
}
