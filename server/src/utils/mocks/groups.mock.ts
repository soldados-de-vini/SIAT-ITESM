import { GroupDto } from '../../groups/dto/group.dto';
import { UpdateGroupDto } from '../../groups/dto/update-group.dto';

const mockUpdateGroupDto = new UpdateGroupDto();
mockUpdateGroupDto.startDate = '2022-11-22';
mockUpdateGroupDto.endDate = '2022-11-24';
mockUpdateGroupDto.matricula = 'TODAS';
mockUpdateGroupDto.formato = 'HDPA';

const mockGroupDto: GroupDto = { ...mockUpdateGroupDto, number: 1 };

export { mockGroupDto, mockUpdateGroupDto };
