import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entity/course20.entity';
import { UsersEntity } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UsersEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, JwtStrategy],
  exports: [CoursesService],
})
export class CoursesModule {}
