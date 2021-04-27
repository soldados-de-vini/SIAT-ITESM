import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  
  import { PeriodsEntity } from '../../periods/entity/periods.entity';
  import { Course21Entity } from '../../courses21/entities/course21.entity';

  
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


    @ManyToOne(() => Course21Entity, (Course21Entity) => Course21Entity.bloqueGroups)
    course21: Course21Entity;
  
    @ManyToOne(() => PeriodsEntity, (PeriodsEntity) => PeriodsEntity.groups)
    period: PeriodsEntity;


}
  