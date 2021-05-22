import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { ProfessorsEntity } from './entity/professors.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([ProfessorsEntity, UsersEntity]),
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService, JwtStrategy],
})
export class ProfessorsModule {}
