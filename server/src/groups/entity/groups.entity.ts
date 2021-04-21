import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CourseEntity } from '../../courses/entity/course.entity';
import { PeriodsEntity } from '../../periods/entity/periods.entity';
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

  @Column('int', { array: true })
  events: number[];

  @ManyToOne(() => CourseEntity, (CourseEntity) => CourseEntity.groups)
  courseId: CourseEntity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups)
  periodId: PeriodsEntity;

}
