import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { ProfessorsToGroups } from '../../professorsToGroups/entity/professorsToGroups.entity';

@Entity('professors')
export class ProfessorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  nomina: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
    array: true,
  })
  area: string[];

  @Column({
    nullable: true,
  })
  coordination: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  loadLimit: number;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.professors)
  user: UsersEntity;

  @OneToMany(
    () => ProfessorsToGroups,
    (ProfessorsToGroups) => ProfessorsToGroups.professors,
  )
  ProfessorsToGroups: ProfessorsToGroups[];
}
