import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { GroupsEntity } from '../../groups/entity/groups.entity';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

export const DEFAULT_DATE = '2000-01-01';

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

  @Column({
    nullable: false,
  })
  @Index()
  weekDay: number;

  @ManyToOne(() => GroupsEntity, (GroupsEntity) => GroupsEntity.events, {
    onDelete: 'CASCADE',
  })
  group: GroupsEntity;

  @ManyToOne(
    () => BloqueGroupModulesEntity,
    (BloqueGroupModulesEntity) => BloqueGroupModulesEntity.events,
    { onDelete: 'CASCADE' },
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
    this.startTime = new Date(`${DEFAULT_DATE} ${this.startTime.toString()}`);
    this.endTime = new Date(`${DEFAULT_DATE} ${this.endTime.toString()}`);
  }
}
