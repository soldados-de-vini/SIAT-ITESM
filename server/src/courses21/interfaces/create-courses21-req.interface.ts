import { ApiProperty } from '@nestjs/swagger';
import { Course21Dto } from '../dto/course21.dto';

export class CreateCourse21Req {
  @ApiProperty()
  courses: Course21Dto[];
}
