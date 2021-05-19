import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomsEntity } from './entity/classrooms.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassroomsEntity,
      UsersEntity,
      GroupsEntity,
      PeriodsEntity,
      BloqueGroupsEntity,
      BloqueGroupModulesEntity,
    ]),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService, JwtStrategy],
})
export class ClassroomsModule {}
