import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomsEntity } from './entity/classrooms.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ClassroomsEntity, UsersEntity])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService, JwtStrategy],
})
export class ClassroomsModule {}
