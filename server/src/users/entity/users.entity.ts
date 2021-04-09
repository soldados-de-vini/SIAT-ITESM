import securityUtils from '../../utils/security.utils';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    unique: true,
    length: 10,
  })
  nomina: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await securityUtils.hashPass(this.password);
  }

  constructor(
    id: string,
    email: string,
    name: string,
    nomina: string,
    password: string,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.nomina = nomina;
    this.password = password;
  }
}
