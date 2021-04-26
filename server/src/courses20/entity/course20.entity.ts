import { BaseCourseEntity } from '../../utils/db/base-course';
import { Entity, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';

@Entity('courses20')
export class CourseEntity extends BaseCourseEntity {
  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.courses)
  user: UsersEntity;
}
