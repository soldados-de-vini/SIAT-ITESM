import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { PeriodsEntity } from '../../periods/entity/periods.entity';
import { Course21Entity } from '../../courses21/entities/course21.entity';
import { BloqueModulesEntity } from '../../bloqueModules/entity/bloqueModules.entity';

@Entity('BloqueGroupsEntity')
export class BloqueGroupsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  number: number;

  @Column('date', {
    nullable: false,
  })
  startDate: Date;

  @Column('date', {
    nullable: false,
  })
  endDate: Date;

  @Column({
    nullable: true,
  })
  matricula: string;

  @ManyToOne(
    () => Course21Entity,
    (Course21Entity) => Course21Entity.bloqueGroups,
  )
  course21: Course21Entity;

  @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups)
  period: PeriodsEntity;

  @OneToMany(
    () => BloqueModulesEntity,
    (BloqueModulesEntity) => BloqueModulesEntity.groupId,
  )
  bloqueModules: BloqueModulesEntity[];
}
