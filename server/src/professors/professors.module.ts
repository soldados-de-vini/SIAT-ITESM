import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { ProfessorsEntity } from './entity/professors.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorsEntity, UsersEntity])],
  controllers: [ProfessorsController],
  providers: [ProfessorsService, JwtStrategy],
})
export class ProfessorsModule {}
