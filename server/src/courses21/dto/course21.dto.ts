import { ApiProperty } from '@nestjs/swagger';
import { Course20Dto } from '../../courses20/dto/course20.dto';

export class Course21Dto extends Course20Dto {
  @ApiProperty()
  modules: string[];
}
