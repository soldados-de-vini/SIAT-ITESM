import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { CourseEntity } from '../../courses20/entity/course20.entity';
import { PeriodsEntity } from '../../periods/entity/periods.entity';
import { ProfessorsToGroups } from '../../professorsToGroups/entity/professorsToGroups.entity';
import { Course21Entity } from '../../courses21/entities/course21.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  number: number;

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

  @Column('int', { array: true })
  events: number[];

  @ManyToOne(() => CourseEntity, (CourseEntity) => CourseEntity.groups)
  course20: CourseEntity;

  @ManyToOne(() => Course21Entity, (Course21Entity) => Course21Entity.groups)
  course21: Course21Entity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups)
  period: PeriodsEntity;

  @ManyToOne(() => ClassroomsEntity)
  @JoinTable()
  classroom: ClassroomsEntity[];

  @OneToMany(
    () => ProfessorsToGroups,
    (ProfessorsToGroups) => ProfessorsToGroups.professors,
  )
  ProfessorsToGroups: ProfessorsToGroups[];
}
