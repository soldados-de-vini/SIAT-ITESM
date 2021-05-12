import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { PeriodsEntity } from '../../periods/entity/periods.entity';
import { Course21Entity } from '../../courses21/entities/course21.entity';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

@Entity('bloque_groups')
export class BloqueGroupsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  number: number;

  @Column({
    nullable: true,
  })
  matricula: string;

  @Column({
    nullable: true,
  })
  formato: string;

  @ManyToOne(
    () => Course21Entity,
    (Course21Entity) => Course21Entity.bloqueGroups,
  )
  course21: Course21Entity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.bloqueGroups)
  period: PeriodsEntity;

  @OneToMany(
    () => BloqueGroupModulesEntity,
    (BloqueGroupModulesEntity) => BloqueGroupModulesEntity.group,
  )
  bloqueModules: BloqueGroupModulesEntity[];
}
