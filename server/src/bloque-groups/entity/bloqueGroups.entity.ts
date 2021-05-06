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
import { BloqueModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

@Entity('bloque_groups')
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

  @Column({
    nullable: false,
  })
  startDateString: string;

  @Column('date', {
    nullable: false,
  })
  endDate: Date;

  @Column({
    nullable: false,
  })
  endDateString: string;

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
    () => BloqueModulesEntity,
    (BloqueModulesEntity) => BloqueModulesEntity.groupId,
  )
  bloqueModules: BloqueModulesEntity[];

  @BeforeInsert() dateStringGen() {
    this._assignValues();
  }

  @BeforeUpdate() updateString() {
    this._assignValues();
  }

  _assignValues() {
    this.startDateString = this.startDate.toString();
    this.endDateString = this.endDate.toString();
    this.startDate = new Date(this.startDate.toString());
    this.endDate = new Date(this.endDate.toString());
  }
}
