import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { GroupsEntity } from '../../groups/entity/groups.entity';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

export enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

@Entity('events')
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time', {
    nullable: false,
  })
  startTime: Date;

  @Column({
    nullable: false,
  })
  startTimeString: string;

  @Column('time', {
    nullable: false,
  })
  endTime: Date;

  @Column({
    nullable: false,
  })
  endTimeString: string;

  @Column('enum', {
    enum: WeekDay,
    nullable: false,
  })
  weekDay: string;

  @ManyToOne(() => GroupsEntity, (GroupsEntity) => GroupsEntity.events)
  group: GroupsEntity;

  @ManyToOne(
    () => BloqueGroupModulesEntity,
    (BloqueGroupModulesEntity) => BloqueGroupModulesEntity.events,
  )
  bloqueGroup: BloqueGroupModulesEntity;

  @BeforeInsert() dateStringGen() {
    this._assignValues();
  }

  @BeforeUpdate() updateString() {
    this._assignValues();
  }

  _assignValues() {
    this.startTimeString = this.startTime.toString();
    this.endTimeString = this.endTime.toString();
    this.startTime = new Date(this.startTime.toString());
    this.endTime = new Date(this.endTime.toString());
  }
}
