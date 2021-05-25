import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { In, Repository } from 'typeorm';
import { BaseEventDto } from './dto/base-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './dto/event-entity.dto';
import { DEFAULT_DATE, EventsEntity } from './entity/events.entity';
import { ProfessorsToGroups } from '../professorsToGroups/entity/professorsToGroups.entity';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';
import { AvailableReq } from '../professors/interfaces/availableReq.interface';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsEntity)
    private eventRepository: Repository<EventsEntity>,
    @InjectRepository(GroupsEntity)
    private groupsRepository: Repository<GroupsEntity>,
    @InjectRepository(BloqueGroupsEntity)
    private bloqueGroupsRepository: Repository<BloqueGroupsEntity>,
    @InjectRepository(BloqueGroupModulesEntity)
    private moduleGroupsRepository: Repository<BloqueGroupModulesEntity>,
    @InjectRepository(ProfessorsEntity)
    private professorsRepository: Repository<ProfessorsEntity>,
    @InjectRepository(ProfessorsToGroups)
    private professorsToGroupsRepository: Repository<ProfessorsToGroups>,
    @InjectRepository(ProfessorsToBloqueModules)
    private professorModuleGroupRepository: Repository<ProfessorsToBloqueModules>,
  ) {}

  /**
   * Creates an event that corresponds to a Tec 20 group.
   * @param eventDto The data of the event.
   * @returns The data created.
   */
  async createEventTec20(eventDto: CreateEventDto): Promise<EventsEntity[]> {
    const group20 = await this.groupsRepository.findOne({
      where: { id: eventDto.groupId },
      relations: ['events'],
    });
    if (group20) {
      const events: EventsEntity[] = [];
      for (const event of eventDto.events) {
        const eventEntity = this.eventRepository.create(event);
        group20.events.push(eventEntity);
        events.push(eventEntity);
      }
      await this.eventRepository.save(events);
      await this.groupsRepository.save(group20);
      return events;
    }
    return null;
  }

  /**
   * Creates an event that corresponds to a Tec 21 group.
   * @param eventDto The data of the event.
   * @returns The data created.
   */
  async createEventTec21(eventDto: CreateEventDto): Promise<EventsEntity[]> {
    const group21 = await this.moduleGroupsRepository.findOne({
      where: { id: eventDto.bloqueGroupId },
      relations: ['events'],
    });
    if (group21) {
      const events: EventsEntity[] = [];
      for (const event of eventDto.events) {
        const eventEntity = this.eventRepository.create(event);
        group21.events.push(eventEntity);
        events.push(eventEntity);
      }
      await this.eventRepository.save(events);
      await this.moduleGroupsRepository.save(group21);
      return events;
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
      relations: ['events'],
    });
    if (group20) {
      const events: EventDto[] = [];
      for (const event of group20.events) {
        events.push(this._eventEntityToDto(event));
      }
      return events;
    }
    return null;
  }

  /**
   * Finds the event of a TEC 21 group.
   * @param groupId The group which the events are assigned to.
   * @returns The events that correspond to the group.
   */
  async findEventTec21(groupId: string): Promise<EventDto[]> {
    const group21 = await this.moduleGroupsRepository.findOne({
      where: { id: groupId },
      relations: ['events'],
    });
    const events: EventDto[] = [];
    for (const event of group21.events) {
      events.push(this._eventEntityToDto(event));
    }
    return events;
  }

  /**
   * Removes all events from the DB.
   * @param eventId The ID of the event.
   * @returns A boolean stating if the delete was successful.
   */
  async removeEvents(events: EventsEntity[]): Promise<boolean> {
    if (events.length == 0) {
      return false;
    }
    const eventIds = [];
    for (const ev of events) {
      eventIds.push(ev.id);
    }
    await this.eventRepository.delete({ id: In(eventIds) });
    return true;
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
      weekDay: event.weekDay,
    };
    return eventDto;
  }

  /**
   * Searches if a classroom is available at the events given.
   * @param classroom The classroom entity.
   * @param eventDtos The events data.
   * @returns True if it's available, false otherwise.
   */
  async searchClassroomCollision(
    classroom: ClassroomsEntity,
    eventDtos: BaseEventDto[],
    groupInitialWeek: number,
    groupEndWeek: number,
  ): Promise<boolean> {
    const groups = await this.groupsRepository.find({
      where: { classroom: classroom },
      relations: ['events', 'course'],
    });
    if (groups.length > 0) {
      // There must be another way to do this faster using the query builder,
      // but because of time will leave it on a nice to have.
      for (const group of groups) {
        for (const event of group.events) {
          for (const dtoEvent of eventDtos) {
            if (
              this._checkTimeCollision(
                dtoEvent,
                groupInitialWeek,
                groupEndWeek,
                event,
                group.course.initialWeek,
                group.course.initialWeek + group.course.weeks,
              )
            ) {
              return true;
            }
          }
        }
      }
    }

    const groups21 = await this.moduleGroupsRepository.find({
      where: { classroom: classroom },
      relations: ['events', 'group', 'group.course21'],
    });
    if (groups21.length > 0) {
      // There must be another way to do this faster using the query builder,
      // but because of time will leave it on a nice to have.
      for (const group of groups21) {
        for (const event of group.events) {
          for (const dtoEvent of eventDtos) {
            if (
              this._checkTimeCollision(
                dtoEvent,
                groupInitialWeek,
                groupEndWeek,
                event,
                group.group.course21.initialWeek,
                group.group.course21.initialWeek + group.group.course21.weeks,
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /**
   * Searches if all the requested professors are available at the time.
   * @param professors The professor UUIDs.
   * @param eventDtos The event data.
   * @returns True if is available, false otherwise.
   */
  async searchProfessorsCollision(
    professors: string[],
    eventDtos: BaseEventDto[],
    groupInitialWeek: number,
    groupEndWeek: number,
  ): Promise<boolean> {
    const entitiesTec20 = await this.professorsToGroupsRepository
      .createQueryBuilder('rel')
      .innerJoinAndSelect('rel.group', 'group')
      .innerJoinAndSelect('group.events', 'events')
      .innerJoinAndSelect('group.course', 'course')
      .where('rel.professor IN(:...ids)', { ids: professors })
      .getMany();
    if (entitiesTec20.length > 0) {
      for (const entity of entitiesTec20) {
        for (const event of entity.group.events) {
          for (const dtoEvent of eventDtos) {
            if (
              this._checkTimeCollision(
                dtoEvent,
                entity.group.course.initialWeek,
                entity.group.course.initialWeek + entity.group.course.weeks,
                event,
                groupInitialWeek,
                groupEndWeek,
              )
            ) {
              return true;
            }
          }
        }
      }
    }

    const entitiesTec21 = await this.professorModuleGroupRepository
      .createQueryBuilder('rel')
      .innerJoinAndSelect('rel.group', 'group')
      .innerJoinAndSelect('group.events', 'events')
      .innerJoinAndSelect('group.group', 'innerGroup')
      .innerJoinAndSelect('innerGroup.course21', 'course')
      .where('rel.professor IN(:...ids)', { ids: professors })
      .getMany();
    if (entitiesTec21.length > 0) {
      for (const entity of entitiesTec21) {
        for (const event of entity.group.events) {
          for (const dtoEvent of eventDtos) {
            if (
              this._checkTimeCollision(
                dtoEvent,
                entity.group.group.course21.initialWeek,
                entity.group.group.course21.initialWeek +
                  entity.group.group.course21.weeks,
                event,
                groupInitialWeek,
                groupEndWeek,
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /**
   * Queries all the available professors of the user at the specified time.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAvailableProfessors(
    uuid: string,
    data: AvailableReq,
  ): Promise<ProfessorsEntity[]> {
    let initialWeek: number;
    let endWeek: number;

    if (data.groupId) {
      const group = await this.groupsRepository.findOne({
        where: { id: data.groupId },
        relations: ['course'],
      });
      initialWeek = group.course.initialWeek;
      endWeek = group.course.weeks + initialWeek;
    } else {
      const group = await this.bloqueGroupsRepository.findOne({
        where: { id: data.bloqueGroupId },
        relations: ['course21'],
      });
      initialWeek = group.course21.initialWeek;
      endWeek = group.course21.weeks + initialWeek;
    }
    const emptyProfessors = await this.professorsRepository
      .createQueryBuilder('professor')
      .leftJoin('professor.user', 'user')
      .leftJoin('professor.groups20', 'groups20')
      .leftJoin('professor.groups21', 'groups21')
      .where(
        'user.id = :userId::uuid AND groups20 IS NULL AND groups21 IS NULL',
        { userId: uuid },
      )
      .getMany();

    const professorsWithGroups = await this.professorsRepository
      .createQueryBuilder('professor')
      .leftJoin('professor.user', 'user')
      .leftJoinAndSelect('professor.groups20', 'groups20')
      .leftJoinAndSelect('groups20.group', 'group20')
      .leftJoinAndSelect('group20.course', 'course20')
      .leftJoin('group20.period', 'period20')
      .leftJoinAndSelect('group20.events', 'events20')
      .leftJoinAndSelect('professor.groups21', 'groups21')
      .leftJoinAndSelect('groups21.group', 'groupModule')
      .leftJoinAndSelect('groupModule.group', 'group21')
      .leftJoinAndSelect('group21.course21', 'course21')
      .leftJoin('group21.period', 'period21')
      .leftJoinAndSelect('groupModule.events', 'events21')
      .where(
        '(user.id = :userId::uuid) AND (period20.id = :periodId::uuid OR period21.id = :periodId::uuid)',
        { periodId: data.periodId, userId: uuid },
      )
      .getMany();

    const availableProfessors: ProfessorsEntity[] = [];
    // Awful 3 nested for loops, I think it's better to add to the query above,
    // but do not want to waste time figuring it out. Theoretically, the data.events
    // will only have at max 7 events, so there is no worry on that one.
    for (const professor of professorsWithGroups) {
      // Check the TEC 20 groups.
      if (professor.groups20.length > 0) {
        if (
          this._checkProfessorTec20(
            professor,
            data.events,
            initialWeek,
            endWeek,
          )
        ) {
          continue;
        }
      }
      // Check the TEC 21 groups
      if (professor.groups21.length > 0) {
        if (
          this._checkProfessorTec21(
            professor,
            data.events,
            initialWeek,
            endWeek,
          )
        ) {
          continue;
        }
      }
      delete professor.groups20;
      delete professor.groups21;
      availableProfessors.push(professor);
    }

    return availableProfessors.concat(emptyProfessors);
  }

  /**
   * Checks if the professor is available at the given time in Groups TEC 20.
   * @param professor The professor object.
   * @param events The events to verify.
   * @returns True or false if there is a collision.
   */
  _checkProfessorTec20(
    professor: ProfessorsEntity,
    events: BaseEventDto[],
    groupInitialWeek: number,
    groupEndWeek: number,
  ): boolean {
    for (const group of professor.groups20) {
      for (const event of group.group.events) {
        for (const dtoEvent of events) {
          if (
            this._checkTimeCollision(
              dtoEvent,
              groupInitialWeek,
              groupEndWeek,
              event,
              group.group.course.initialWeek,
              group.group.course.initialWeek + group.group.course.weeks,
            )
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Checks if the professor is available at the given time in Groups TEC 21.
   * @param professor The professor object.
   * @param events The events to verify.
   * @returns True or false if there is a collision.
   */
  _checkProfessorTec21(
    professor: ProfessorsEntity,
    events: BaseEventDto[],
    groupInitialWeek: number,
    groupEndWeek: number,
  ): boolean {
    for (const group of professor.groups21) {
      for (const event of group.group.events) {
        for (const dtoEvent of events) {
          // Tilted by the triple dot group.
          const course = group.group.group.course21;
          if (
            this._checkTimeCollision(
              dtoEvent,
              groupInitialWeek,
              groupEndWeek,
              event,
              course.initialWeek,
              course.initialWeek + course.weeks,
            )
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Checks if two events are colliding.
   * @param dtoEvent The event given by the user.
   * @param event The event entity.
   * @returns True if they collide, false otherwise.
   */
  _checkTimeCollision(
    dtoEvent: BaseEventDto,
    dtoInitialWeek: number,
    dtoEndWeek: number,
    event: EventsEntity,
    existingInitialWeek: number,
    existingEndWeek: number,
  ) {
    const st = this._stringToDate(dtoEvent.startTime);
    const et = this._stringToDate(dtoEvent.endTime);
    const eventSt = this._stringToDate(event.startTime.toString());
    const eventEt = this._stringToDate(event.endTime.toString());
    // Reduce one to the end week since we want a exclusive comparison.
    dtoEndWeek = dtoEndWeek - 1;
    existingEndWeek = existingEndWeek - 1;
    // Check if the hours collide and verify that the courses do not collide.
    return (
      ((st >= eventSt && st < eventEt) || (et > eventSt && et <= eventEt)) &&
      dtoEvent.weekDay == event.weekDay &&
      ((dtoInitialWeek >= existingInitialWeek &&
        dtoInitialWeek <= existingEndWeek) ||
        (dtoEndWeek >= existingInitialWeek && dtoEndWeek <= existingEndWeek))
    );
  }

  /**
   * Transform a string date into a readable format for the DB.
   * @param date The date to transform.
   * @returns The transformed date.
   */
  _stringToDate(date: string): Date {
    return new Date(`${DEFAULT_DATE} ${date}`);
  }
}
