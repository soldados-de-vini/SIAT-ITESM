import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entity/course.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { ModuleEntity } from '../module/entity/module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, UsersEntity, ModuleEntity]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, JwtStrategy],
})
export class CoursesModule {}
