import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsToGroups } from '../professorsToGroups/entity/professorsToGroups.entity';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { EventsEntity } from './entity/events.entity';
import { EventsService } from './events.service';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventsEntity,
      GroupsEntity,
      BloqueGroupsEntity,
      BloqueGroupModulesEntity,
      ProfessorsToGroups,
      ProfessorsToBloqueModules,
      ProfessorsEntity,
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
