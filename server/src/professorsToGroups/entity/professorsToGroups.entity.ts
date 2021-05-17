import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('professors_to_groups')
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
  professor: ProfessorsEntity;

  @ManyToOne(
    () => GroupsEntity,
    (GroupsEntity) => GroupsEntity.ProfessorsToGroups,
  )
  group: GroupsEntity;
}
