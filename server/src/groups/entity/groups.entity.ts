import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CourseEntity } from '../../courses/entity/course.entity';
import { PeriodsEntity } from '../../periods/entity/periods.entity';
import { ProfessorsToGroups } from '../../ProfessorsToGroups/entity/ProfessorsToGroups.entity';

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

  @Column({
    nullable: false,
  })
  classroom: string;

  @Column('int', { array: true })
  events: number[];

  @ManyToOne(() => CourseEntity, (CourseEntity) => CourseEntity.groups)
  courseId: CourseEntity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups)
  periodId: PeriodsEntity;

  @OneToMany(
    () => ProfessorsToGroups,
    (ProfessorsToGroups) => ProfessorsToGroups.professors,
  )
  ProfessorsToGroups: ProfessorsToGroups[];
}
