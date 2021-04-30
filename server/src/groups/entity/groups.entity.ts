import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
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
  number: number;

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
  formato: string;

  @Column({
    nullable: true,
  })
  matricula: string;

  @ManyToOne(() => CourseEntity, (CourseEntity) => CourseEntity.groups)
  course: CourseEntity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups)
  period: PeriodsEntity;

  @ManyToOne(() => ClassroomsEntity)
  @JoinTable()
  classroom: ClassroomsEntity;

  @OneToMany(
    () => ProfessorsToGroups,
    (ProfessorsToGroups) => ProfessorsToGroups.professors,
  )
  ProfessorsToGroups: ProfessorsToGroups[];

  @OneToMany(() => EventsEntity, (EventsEntity) => EventsEntity.group)
  events: EventsEntity[];

  @BeforeInsert() dateStringGen() {
    this._assignValues();
  }

  @BeforeUpdate() updateString() {
    this._assignValues();
  }

  _assignValues() {
    this.startDateString = this.startDate.toString();
    this.endDateString = this.endDate.toString();
    this.startDate = new Date(this.startDate.toString());
    this.endDate = new Date(this.endDate.toString());
  }
}
