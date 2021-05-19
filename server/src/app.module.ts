import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses20/courses.module';
import { ModuleModule } from './module/module.module';
import { ProfessorsModule } from './professors/professors.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { PeriodsModule } from './periods/periods.module';
import { Courses21Module } from './courses21/courses21.module';
import { GroupsModule } from './groups/groups.module';
import { BloqueGroupsModule } from './bloque-groups/bloque-groups.module';
import { BloqueModulesModule } from './bloque-group-modules/bloque-modules.module';
import { EventsModule } from './events/events.module';
import { AvenueModule } from './avenue/avenue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [UsersEntity],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    ModuleModule,
    ProfessorsModule,
    ClassroomsModule,
    PeriodsModule,
    Courses21Module,
    GroupsModule,
    BloqueGroupsModule,
    BloqueModulesModule,
    EventsModule,
    AvenueModule,
  ],
})
export class AppModule {}
