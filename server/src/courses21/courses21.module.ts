import { Module } from '@nestjs/common';
import { Courses21Service } from './courses21.service';
import { Courses21Controller } from './courses21.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course21Entity } from './entities/course21.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { ModuleEntity } from '../module/entity/module.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ModuleService } from '../module/module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course21Entity, UsersEntity, ModuleEntity]),
  ],
  controllers: [Courses21Controller],
  providers: [Courses21Service, ModuleService, JwtStrategy],
  exports: [Courses21Service],
})
export class Courses21Module {}
