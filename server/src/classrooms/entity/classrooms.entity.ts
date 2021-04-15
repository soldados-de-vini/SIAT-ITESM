import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';

@Entity('classrooms')
export class ClassroomsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  classroom: number;

  @Column({
    nullable: false,
  })
  building: string;

  @Column({
    nullable: false,
  })
  capacity: number;

  @Column()
  comments: string;

  @Column({
    nullable: false,
  })
  type: string;

  @Column()
  school: string;

  @Column()
  entrance: string;

  @Column()
  currentDiv: string;

  @Column()
  administrator: string;

  @Column({
    nullable: false,
  })
  status: string;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.classrooms)
  user: UsersEntity;
}
