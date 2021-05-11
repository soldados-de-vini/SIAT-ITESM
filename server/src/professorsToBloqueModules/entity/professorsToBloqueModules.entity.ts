import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

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
    () => BloqueGroupModulesEntity,
    (BloqueGroupModulesEntity) =>
      BloqueGroupModulesEntity.ProfessorsToBloqueModules,
  )
  groups: ProfessorsEntity;
}
