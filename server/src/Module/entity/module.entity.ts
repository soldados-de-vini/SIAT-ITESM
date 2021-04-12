import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';

@Entity('module')
export class ModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.modules)
  user: UsersEntity;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
