import { ModuleEntity } from '../../module/entity/module.entity';
import { ModuleDto } from '../../module/dto/module.dto';

const name = 'module1';
const id = 'uuid';

const mockModuleDto = new ModuleDto();
mockModuleDto.name = name;

const mockModuleEntity = new ModuleEntity();
mockModuleEntity.name = name;
mockModuleEntity.id = id;

export { mockModuleDto, mockModuleEntity };
