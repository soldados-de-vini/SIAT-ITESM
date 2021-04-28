import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { BloqueModulesEntity } from '../../bloqueModules/entity/bloqueModules.entity';

@Entity('ProfessorsToBloqueModules')
export class ProfessorsToBloqueModules {
  @PrimaryGeneratedColumn()
  ProfessorsToBloqueModulesId: number;

  @Column({
    nullable: false,
  })
  responsabilityPercent: number;

  @ManyToOne(
    () => ProfessorsEntity,
    (ProfessorsEntity) => ProfessorsEntity.ProfessorsToBloqueModules,
  )
  professors: ProfessorsEntity;

  @ManyToOne(
    () => BloqueModulesEntity,
    (BloqueModulesEntity) => BloqueModulesEntity.ProfessorsToBloqueModules,
  )
  groups: ProfessorsEntity;
}
