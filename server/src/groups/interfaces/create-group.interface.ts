import { GroupDto } from '../dto/group.dto';

export interface CreateGroupReq {
  groups: GroupDto[];
  courseId: string;
  periodId: string;
}
