import { GroupDto } from '../../groups/dto/group.dto';

const mockGroupDto = new GroupDto();
mockGroupDto.startDate = '2022-11-22';
mockGroupDto.endDate = '2022-11-24';
mockGroupDto.matricula = 'TODAS';
mockGroupDto.formato = 'HDPA';
mockGroupDto.number = 1;

export { mockGroupDto };
