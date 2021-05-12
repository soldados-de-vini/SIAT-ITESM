import { GroupDto } from '../../groups/dto/group.dto';
import { UpdateGroupDto } from '../../groups/dto/update-group.dto';

const mockUpdateGroupDto = new UpdateGroupDto();
mockUpdateGroupDto.matricula = 'TODAS';
mockUpdateGroupDto.formato = 'HDPA';

const mockGroupDto = new GroupDto();
mockGroupDto.groupsAmount = 2;
mockGroupDto.courseKey = 'ID';

export { mockGroupDto, mockUpdateGroupDto };
