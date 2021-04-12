import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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
