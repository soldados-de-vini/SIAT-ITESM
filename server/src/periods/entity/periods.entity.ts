import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

/**
 * TODO(hivini): Do the following fixes
 *    - Make sure that endDate is not before start date.
 *    - Make sure that vacations are inside both dates.
 *    - When deleting, it needs to make sure that no events are affected.
 */
@Entity('periods')
export class PeriodsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({
    nullable: false,
  })
  startDateString: string;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @Column({
    nullable: false,
  })
  endDateString: string;

  @Column('text', {
    array: true,
  })
  vacations: string[];

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

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.periods)
  user: UsersEntity;

  @OneToMany(() => GroupsEntity, (GroupsEntity) => GroupsEntity.period)
  groups: GroupsEntity[];
}
