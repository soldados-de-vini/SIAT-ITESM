import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('module')
export class ModuleEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;


  constructor(
    id: string,
    name: string,
  ) {
    this.id = id;
    this.name = name;
  }
}
