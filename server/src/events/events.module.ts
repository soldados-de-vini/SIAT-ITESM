import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './entity/events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
