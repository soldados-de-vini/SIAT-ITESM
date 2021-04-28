import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from './entity/groups.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { CourseEntity } from '../courses20/entity/course20.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupsEntity, PeriodsEntity, CourseEntity]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, JwtStrategy],
})
export class GroupsModule {}
