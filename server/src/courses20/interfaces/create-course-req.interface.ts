import { ApiProperty } from '@nestjs/swagger';
import { Course20Dto } from '../dto/course20.dto';

export class CreateCourseReq {
  @ApiProperty()
  courses: Course20Dto[];
}
