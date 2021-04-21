import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

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

  @Column({
    nullable: true,
  })
  school: string;

  @Column({
    nullable: true,
  })
  entrance: string;

  @Column({
    nullable: true,
  })
  currentDiv: string;

  @Column({
    nullable: true,
  })
  administrator: string;

  @Column({
    nullable: false,
  })
  status: string;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.classrooms)
  user: UsersEntity;


  @ManyToMany(() => GroupsEntity)
  @JoinTable()
  groups: GroupsEntity[];

}
