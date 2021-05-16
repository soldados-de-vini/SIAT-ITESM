import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from './entity/groups.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { EventsModule } from '../events/events.module';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { ProfessorsToGroups } from '../professorsToGroups/entity/professorsToGroups.entity';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      GroupsEntity,
      PeriodsEntity,
      CourseEntity,
      ProfessorsEntity,
      ClassroomsEntity,
      ProfessorsToGroups,
    ]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, JwtStrategy],
})
export class GroupsModule {}
