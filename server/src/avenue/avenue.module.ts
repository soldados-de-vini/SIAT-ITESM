import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersEntity } from 'src/users/entity/users.entity';
import { AvenueController } from './avenue.controller';
import { AvenueService } from './avenue.service';
import { AvenueEntity } from './entity/avenue.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AvenueEntity,UsersEntity])],
    controllers: [AvenueController],
    providers: [AvenueService, JwtStrategy],
})
export class AvenueModule {}
