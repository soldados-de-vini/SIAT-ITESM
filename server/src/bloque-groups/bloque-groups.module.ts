import { Module } from '@nestjs/common';
import { BloqueGroupsService } from './bloque-groups.service';
import { BloqueGroupsController } from './bloque-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueGroupsEntity } from './entity/bloqueGroups.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BloqueGroupsEntity,
      PeriodsEntity,
      Course21Entity,
      BloqueGroupModulesEntity,
    ]),
  ],
  controllers: [BloqueGroupsController],
  providers: [BloqueGroupsService, JwtStrategy],
})
export class BloqueGroupsModule {}
