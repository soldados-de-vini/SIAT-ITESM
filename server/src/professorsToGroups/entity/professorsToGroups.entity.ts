import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('ProfessorsToGroups')
export class ProfessorsToGroups {
  @PrimaryGeneratedColumn()
  ProfessorsToGroupsId: number;

  @Column({
    nullable: false,
  })
  responsabilityPercent: number;

  @ManyToOne(
    () => ProfessorsEntity,
    (ProfessorsEntity) => ProfessorsEntity.ProfessorsToGroups,
  )
  professors: ProfessorsEntity;

  @ManyToOne(
    () => GroupsEntity,
    (GroupsEntity) => GroupsEntity.ProfessorsToGroups,
  )
  groups: ProfessorsEntity;
}
