import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {UsersEntity} from "../../users/entity/users.entity";
import {ModuleEntity} from "../../module/entity/module.entity";

@Entity('course')
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

  // EDUCATION MODEL: TEC20/TEC21
  @Column({
    nullable: false,
  })
  educationalModel: string;

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

  @Column()
  avenue: string;

  @Column()
  typeUF: Array<string>;

  @ManyToOne(() => UsersEntity, UsersEntity => UsersEntity.courses)
    user: UsersEntity;


  @ManyToMany(() => ModuleEntity)
  @JoinTable()
  modules: ModuleEntity[];


  constructor(
    id: string,
    key: string,
    name: string,
    capacity: number,
    educationalModel: string,
    semester: string,
    initialWeek: number,
    weeks: number,
    avenue: string,
    typeUF: Array<string>,
  ) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.capacity = capacity;
    this.educationalModel = educationalModel;
    this.semester = semester;
    this.initialWeek = initialWeek;
    this.weeks = weeks;
    this.avenue = avenue;
    this.typeUF = typeUF;

  }
}
