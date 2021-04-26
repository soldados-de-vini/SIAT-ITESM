import { BaseCourseEntity } from '../../utils/db/base-course';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('courses20')
export class CourseEntity extends BaseCourseEntity {
  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.courses)
  user: UsersEntity;

  @OneToMany(() => GroupsEntity, (GroupsEntity) => GroupsEntity.course20)
  groups: GroupsEntity[];
}
