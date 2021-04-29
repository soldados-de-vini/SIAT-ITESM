import { BloqueGroupDto } from '../../bloque-groups/dto/bloque-group.dto';

const mockBloqueGroupDto = new BloqueGroupDto();
mockBloqueGroupDto.number = 1;
mockBloqueGroupDto.startDate = '2022-11-22';
mockBloqueGroupDto.endDate = '2022-11-24';
mockBloqueGroupDto.matricula = 'TODAS';
mockBloqueGroupDto.formato = 'HDPA';

export { mockBloqueGroupDto };
