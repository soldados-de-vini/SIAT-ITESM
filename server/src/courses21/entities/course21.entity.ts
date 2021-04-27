import { ModuleEntity } from '../../module/entity/module.entity';
import { BaseCourseEntity } from '../../utils/db/base-course';
import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';

@Entity('courses21')
export class Course21Entity extends BaseCourseEntity {
  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.courses21)
  user: UsersEntity;

  @ManyToMany(() => ModuleEntity, { cascade: true })
  @JoinTable()
  modules: ModuleEntity[];
}
