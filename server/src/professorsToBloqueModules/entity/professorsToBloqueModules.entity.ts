import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

@Entity('professor_to_bloque_modules')
export class ProfessorsToBloqueModules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  responsabilityPercent: number;

  @ManyToOne(
    () => ProfessorsEntity,
    (ProfessorsEntity) => ProfessorsEntity.groups21,
  )
  professor: ProfessorsEntity;

  @ManyToOne(
    () => BloqueGroupModulesEntity,
    (BloqueGroupModulesEntity) => BloqueGroupModulesEntity.group,
    { onDelete: 'CASCADE' },
  )
  group: BloqueGroupModulesEntity;
}
