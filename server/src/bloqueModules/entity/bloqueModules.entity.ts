import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { ModuleEntity } from '../../module/entity/module.entity';
import { BloqueGroupsEntity } from '../../bloque-groups/entity/bloqueGroups.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';
import { ProfessorsToBloqueModules } from '../../professorsToBloqueModules/entity/professorsToBloqueModules.entity';

@Entity('BloqueModuleEntity')
export class BloqueModulesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  key: string;

  @Column('date', {
    nullable: false,
  })
  startDate: Date;

  @Column({
    nullable: false,
  })
  startDateString: string;

  @Column('date', {
    nullable: false,
  })
  endDate: Date;

  @Column({
    nullable: false,
  })
  endDateString: string;

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
