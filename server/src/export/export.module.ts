import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { CoursesModule } from '../courses20/courses.module';
import { Courses21Module } from '../courses21/courses21.module';
import { ProfessorsModule } from '../professors/professors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, Course21Entity]),
    CoursesModule,
    Courses21Module,
    ProfessorsModule,
  ],
  controllers: [ExportController],
  providers: [ExportService, JwtStrategy],
})
export class ExportModule {}
