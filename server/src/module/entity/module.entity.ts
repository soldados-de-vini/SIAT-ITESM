import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

@Entity('modules')
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

  @OneToMany(
    () => BloqueGroupModulesEntity,
    (BloqueModulesEntity) => BloqueModulesEntity.module,
  )
  bloqueModules: BloqueGroupModulesEntity[];
}
