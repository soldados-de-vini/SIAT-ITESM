import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';

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
  vactions: Date[];

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.periods)
  user: UsersEntity;
}
