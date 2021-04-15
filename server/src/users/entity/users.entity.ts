import securityUtils from '../../utils/security.utils';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { CourseEntity } from '../../courses/entity/course.entity';
import { ModuleEntity } from '../../module/entity/module.entity';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    unique: true,
    length: 10,
  })
  nomina: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await securityUtils.hashPass(this.password);
  }

  @OneToMany(() => CourseEntity, (CourseEntity) => CourseEntity.user)
  courses: CourseEntity[];

  @OneToMany(
    () => ClassroomsEntity,
    (ClassroomsEntity) => ClassroomsEntity.user,
  )
  classrooms: ClassroomsEntity[];

  @OneToMany(
    () => ProfessorsEntity,
    (ProfessorsEntity) => ProfessorsEntity.user,
  )
  professors: ProfessorsEntity[];

  @OneToMany(() => ModuleEntity, (ModuleEntity) => ModuleEntity.user)
  modules: ModuleEntity[];
}
