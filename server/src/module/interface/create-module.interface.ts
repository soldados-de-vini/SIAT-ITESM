import { ApiProperty } from '@nestjs/swagger';
import { ModuleDto } from '../dto/module.dto';

export class CreateModuleReq {
  @ApiProperty()
  modules: ModuleDto[];
}
