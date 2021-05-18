import { Module } from '@nestjs/common';
import { BloqueModulesService } from './bloque-modules.service';
import { BloqueModulesController } from './bloque-modules.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueGroupModulesEntity } from './entity/bloque-modules.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { ModuleEntity } from '../module/entity/module.entity';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      BloqueGroupModulesEntity,
      BloqueGroupsEntity,
      ModuleEntity,
      ProfessorsEntity,
      ClassroomsEntity,
      ProfessorsToBloqueModules,
    ]),
  ],
  controllers: [BloqueModulesController],
  providers: [BloqueModulesService, JwtStrategy],
})
export class BloqueModulesModule {}
