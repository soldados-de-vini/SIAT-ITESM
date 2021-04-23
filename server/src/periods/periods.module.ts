import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodsEntity } from './entity/periods.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodsEntity, UsersEntity])],
  controllers: [PeriodsController],
  providers: [PeriodsService, JwtStrategy],
})
export class PeriodsModule {}
