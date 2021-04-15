import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './entity/module.entity';
import { UsersEntity } from 'src/users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, UsersEntity])],
  controllers: [ModuleController],
  providers: [ModuleService, JwtStrategy],
})
export class ModuleModule {}
