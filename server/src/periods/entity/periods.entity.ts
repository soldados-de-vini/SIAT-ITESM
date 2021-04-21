import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('periods')
export class PeriodsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  startDate: number;

  @Column()
  endDate: number;

  @Column('date', {
    array: true,
  })
  vacations: Date[];

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.periods)
  user: UsersEntity;

  @OneToMany(() => GroupsEntity, (GroupsEntity) => GroupsEntity.periodId)
  groups: GroupsEntity[];
}
