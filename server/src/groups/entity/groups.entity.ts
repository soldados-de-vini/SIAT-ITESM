import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  Index,
} from 'typeorm';

import { CourseEntity } from '../../courses20/entity/course20.entity';
import { PeriodsEntity } from '../../periods/entity/periods.entity';
import { ProfessorsToGroups } from '../../professorsToGroups/entity/professorsToGroups.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';
import { EventsEntity } from '../../events/entity/events.entity';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  @Index()
  number: number;

  @Column({
    nullable: true,
  })
  formato: string;

  @Column({
    nullable: true,
  })
  matricula: string;

  @ManyToOne(() => CourseEntity, (CourseEntity) => CourseEntity.groups)
  course: CourseEntity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups, {
    onDelete: 'CASCADE',
  })
  period: PeriodsEntity;

  @ManyToOne(() => ClassroomsEntity)
  @JoinTable()
  classroom: ClassroomsEntity;

  @OneToMany(
    () => ProfessorsToGroups,
    (ProfessorsToGroups) => ProfessorsToGroups.group,
    { onDelete: 'CASCADE' },
  )
  professors: ProfessorsToGroups[];

  @OneToMany(() => EventsEntity, (EventsEntity) => EventsEntity.group, {
    onDelete: 'CASCADE',
  })
  events: EventsEntity[];
}
