import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ModuleDto } from '../../module/dto/module.dto';

export class UpdateCourseModulesDto {
  @ApiProperty()
  @IsNotEmpty()
  modules: ModuleDto[];
}
