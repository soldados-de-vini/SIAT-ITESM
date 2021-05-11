import { Module } from '@nestjs/common';
import { BloqueModulesService } from './bloque-modules.service';
import { BloqueModulesController } from './bloque-modules.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueGroupModulesEntity } from './entity/bloque-modules.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { ModuleEntity } from '../module/entity/module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BloqueGroupModulesEntity,
      BloqueGroupsEntity,
      ModuleEntity,
    ]),
  ],
  controllers: [BloqueModulesController],
  providers: [BloqueModulesService, JwtStrategy],
})
export class BloqueModulesModule {}
