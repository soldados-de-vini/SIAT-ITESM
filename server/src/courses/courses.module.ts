import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entity/course.entity';
import { UsersEntity } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UsersEntity])],
  controllers: [CoursesController],
  providers: [CoursesService, JwtStrategy],
})
export class CoursesModule {}
