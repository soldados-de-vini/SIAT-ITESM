import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueGroupModulesEntity } from 'src/bloque-group-modules/entity/bloque-modules.entity';
import { GroupsEntity } from 'src/groups/entity/groups.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './dto/event-entity.dto';
import { EventsEntity, WeekDay } from './entity/events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsEntity)
    private eventRepository: Repository<EventsEntity>,
    @InjectRepository(GroupsEntity)
    private groupsRepository: Repository<GroupsEntity>,
    @InjectRepository(BloqueGroupModulesEntity)
    private bloqueGroupsRepository: Repository<BloqueGroupModulesEntity>,
  ) {}

  /**
   * Creates an event that corresponds to a Tec 20 group.
   * @param eventDto The data of the event.
   * @returns The data created.
   */
  async createEventTec20(eventDto: CreateEventDto): Promise<EventDto> {
    const group20 = await this.groupsRepository.findOne({
      where: { id: eventDto.groupId },
      relations: ['events'],
    });
    if (group20) {
      const event = this.eventRepository.create(eventDto);
      group20.events.push(event);
      await this.eventRepository.save(event);
      await this.eventRepository.save(group20);
      return this._eventEntityToDto(event);
    }
    return null;
  }

  /**
   * Creates an event that corresponds to a Tec 21 group.
   * @param eventDto The data of the event.
   * @returns The data created.
   */
  async createEventTec21(eventDto: CreateEventDto): Promise<EventDto> {
    const group21 = await this.bloqueGroupsRepository.findOne({
      where: { id: eventDto.bloqueGroupId },
      relations: ['events'],
    });
    if (group21) {
      const event = this.eventRepository.create(eventDto);
      group21.events.push(event);
      await this.eventRepository.save(event);
      await this.eventRepository.save(group21);
      return this._eventEntityToDto(event);
    }
    return null;
  }

  /**
   * Finds the event of a TEC 20 group.
   * @param groupId The group which the events are assigned to.
   * @returns The events that correspond to the group.
   */
  async findEventTec20(groupId: string): Promise<EventDto[]> {
    const group20 = await this.groupsRepository.findOne({
      where: { id: groupId },
    });
    const events: EventDto[] = [];
    for (const event of group20.events) {
      events.push(this._eventEntityToDto(event));
    }
    return events;
  }

  /**
   * Finds the event of a TEC 21 group.
   * @param groupId The group which the events are assigned to.
   * @returns The events that correspond to the group.
   */
  async findEventTec21(groupId: string): Promise<EventDto[]> {
    const group21 = await this.bloqueGroupsRepository.findOne({
      where: { id: groupId },
    });
    const events: EventDto[] = [];
    for (const event of group21.events) {
      events.push(this._eventEntityToDto(event));
    }
    return events;
  }

  /**
   * Removes an event from the DB.
   * @param eventId The ID of the event.
   * @returns A boolean stating if the event was found.
   */
  async removeEvent(eventId: string): Promise<boolean> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (event) {
      await this.eventRepository.remove(event);
      return true;
    }
    return false;
  }

  /**
   * Transforms an entity to a DTO
   * @param event The event entity to be transformed.
   * @returns The DTO of the event.
   */
  _eventEntityToDto(event: EventsEntity): EventDto {
    const eventDto: EventDto = {
      id: event.id,
      startTime: event.startTimeString,
      endTime: event.endTimeString,
      weekDay: WeekDay[event.weekDay],
    };
    return eventDto;
  }
}
