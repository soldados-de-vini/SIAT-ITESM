import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('course')
export class Course {

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
  format: string; // SUGESTION: Renaming to: educationalModel

  @Column()
  semester: string; 

  @Column({
    nullable: false,
  })
  initialPerdiod: number; // SUGESTION: Renaming to: initialWeek

  @Column({
    nullable: false,
  })
  weeks: number;

  // TODO: Ask about the following data-types

  @Column()
  matricula: string; 

  @Column()
  avenue: string;

  @Column()
  typeUF: Array<string>;


  constructor(
    id: string,
    key: string,
    name: string,
    capacity: number,
    format: string,
    semester: string,
    initialPeriod: number,
    weeks: number,
    matricula: string,
    avenue: string,
    typeUF: Array<string>,
  ) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.capacity = capacity;
    this.format = format;
    this.semester = semester;
    this.initialPerdiod = initialPeriod;
    this.weeks = weeks;
    this.matricula = matricula;
    this.avenue = avenue;
    this.typeUF = typeUF;

  }
}
