import securityUtils from '../../utils/security.utils';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { CourseEntity } from '../../course/entity/course.entity';
import { ModuleEntity } from '../../Module/entity/module.entity';

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

  @OneToMany(() => ModuleEntity, (ModuleEntity) => ModuleEntity.user)
  modules: ModuleEntity[];

  constructor(
    id: string,
    email: string,
    name: string,
    nomina: string,
    password: string,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.nomina = nomina;
    this.password = password;
  }
}
