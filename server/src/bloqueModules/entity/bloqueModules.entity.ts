import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { ModuleEntity } from '../../module/entity/module.entity';
import { BloqueGroupsEntity } from '../../bloqueGroups/entity/bloqueGroups.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';
import { ProfessorsToBloqueModules } from '../../professorsToBloqueModules/entity/professorsToBloqueModules.enity';

@Entity('BloqueModuleEntity')
export class BloqueModulesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  key: string;

  // CLASSROOM
  @Column({
    nullable: false,
  })
  classroom: string;

  @Column('int', { array: true })
  events: number[];

  // PROFESSORS

  // MODULE ID

  @Column('date', {
    nullable: false,
  })
  startDate: Date;

  @Column('date', {
    nullable: false,
  })
  endDate: Date;

  @Column({
    nullable: true,
  })
  matricula: string;

  @ManyToOne(
    () => BloqueGroupsEntity,
    (BloqueGroupsEntity) => BloqueGroupsEntity.bloqueModules,
  )
  groupId: BloqueGroupsEntity;

  @ManyToOne(() => ModuleEntity, (ModuleEntity) => ModuleEntity.bloqueModules)
  moduleId: ModuleEntity;

  @ManyToOne(() => ClassroomsEntity)
  @JoinTable()
  classroomId: ClassroomsEntity[];

  @OneToMany(
    () => ProfessorsToBloqueModules,
    (ProfessorsToBloqueModules) => ProfessorsToBloqueModules.professors,
  )
  ProfessorsToBloqueModules: ProfessorsToBloqueModules[];
}
