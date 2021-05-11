import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';
import { BloqueGroupsEntity } from '../../bloque-groups/entity/bloqueGroups.entity';
import { ModuleEntity } from '../../module/entity/module.entity';

const mockModuleGroup = new BloqueGroupModulesEntity();
mockModuleGroup.group = new BloqueGroupsEntity();
mockModuleGroup.group.id = 'uuid';
mockModuleGroup.module = new ModuleEntity();
mockModuleGroup.module.id = 'uuid';

export { mockModuleGroup };
