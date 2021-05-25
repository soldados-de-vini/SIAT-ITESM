import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { Course21Entity } from '../courses21/entities/course21.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, Course21Entity])],
  controllers: [ExportController],
  providers: [ExportService, JwtStrategy],
})
export class ExportModule {}
