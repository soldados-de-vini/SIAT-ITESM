import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { ModuleEntity } from '../../module/entity/module.entity';

enum CourseType {
  Module = 'M',
  Bloque = 'B',
  Tec20 = 'TEC20',
}

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  key: string;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: false,
  })
  capacity: number;

  @Column()
  semester: string;

  @Column({
    nullable: false,
  })
  initialWeek: number;

  @Column({
    nullable: false,
  })
  weeks: number;

  @Column('text', { array: true })
  avenue: string[];

  @Column({
    type: 'enum',
    enum: CourseType,
    nullable: false,
  })
  typeUF: CourseType;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.courses)
  user: UsersEntity;

  @ManyToMany(() => ModuleEntity)
  @JoinTable()
  modules: ModuleEntity[];
}
