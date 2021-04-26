import { Column, PrimaryGeneratedColumn } from 'typeorm';

enum CourseType {
  Module = 'M',
  Bloque = 'B',
  Tec20 = 'TEC20',
}

export class BaseCourseEntity {
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
}
