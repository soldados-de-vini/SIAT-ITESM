import { ApiProperty } from '@nestjs/swagger';
import { ProfessorDto } from '../dto/professor.dto';

export class CreateProfessorsReq {
  @ApiProperty()
  professors: ProfessorDto[];
}
