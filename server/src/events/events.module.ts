import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsToGroups } from '../professorsToGroups/entity/professorsToGroups.entity';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { EventsEntity } from './entity/events.entity';
import { EventsService } from './events.service';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventsEntity,
      GroupsEntity,
      BloqueGroupModulesEntity,
      ProfessorsToGroups,
      ProfessorsToBloqueModules,
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
