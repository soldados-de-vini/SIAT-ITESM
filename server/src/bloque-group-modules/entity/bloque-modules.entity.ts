import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { ModuleEntity } from '../../module/entity/module.entity';
import { BloqueGroupsEntity } from '../../bloque-groups/entity/bloqueGroups.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';
import { EventsEntity } from '../../events/entity/events.entity';
import { ProfessorsToBloqueModules } from '../../professorsToBloqueModules/entity/professorsToBloqueModules.entity';

@Entity('module_group')
export class BloqueGroupModulesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => BloqueGroupsEntity,
    (BloqueGroupsEntity) => BloqueGroupsEntity.bloqueModules,
    { onDelete: 'CASCADE' },
  )
  group: BloqueGroupsEntity;

  @ManyToOne(() => ModuleEntity, (ModuleEntity) => ModuleEntity.bloqueModules)
  module: ModuleEntity;

  @ManyToOne(() => ClassroomsEntity)
  classroom: ClassroomsEntity;

  @OneToMany(
    () => ProfessorsToBloqueModules,
    (ProfessorsToBloqueModules) => ProfessorsToBloqueModules.group,
    { onDelete: 'CASCADE' },
  )
  professors: ProfessorsToBloqueModules[];

  @OneToMany(() => EventsEntity, (EventsEntity) => EventsEntity.bloqueGroup, {
    onDelete: 'CASCADE',
  })
  events: EventsEntity[];
}
