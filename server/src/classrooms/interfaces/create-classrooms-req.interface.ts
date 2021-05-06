import { ApiProperty } from '@nestjs/swagger';
import { ClassroomDto } from '../dto/classroom.dto';

export class CreateClassroomsReq {
  @ApiProperty()
  classrooms: ClassroomDto[];
}
