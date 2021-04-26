import { IsNotEmpty } from 'class-validator';
import { ModuleDto } from '../../module/dto/module.dto';

export class UpdateCourseModulesDto {
  @IsNotEmpty()
  modules: ModuleDto[];
}
