import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';

@Entity('avenue')
export class AvenueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.modules)
  user: UsersEntity;
}
