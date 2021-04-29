import { BloqueGroupDto } from '../dto/bloque-group.dto';

export interface CreateBloqueGroupReq {
  groups: BloqueGroupDto[];
  course21Id: string;
  periodId: string;
}
