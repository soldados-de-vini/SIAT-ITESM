import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomina: string;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column()
  hash: string;
}