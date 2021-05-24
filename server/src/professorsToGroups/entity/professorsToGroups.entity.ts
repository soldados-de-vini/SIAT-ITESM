import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('professors_to_groups')
export class ProfessorsToGroups {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('real', {
    nullable: false,
  })
  responsabilityPercent: number;

  @ManyToOne(
    () => ProfessorsEntity,
    (ProfessorsEntity) => ProfessorsEntity.groups20,
  )
  professor: ProfessorsEntity;

  @ManyToOne(() => GroupsEntity, (GroupsEntity) => GroupsEntity.professors)
  group: GroupsEntity;
}
