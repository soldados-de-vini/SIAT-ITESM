import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { In, IsNull, Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { BloqueGroupModulesEntity } from './entity/bloque-modules.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { ModuleEntity } from '../module/entity/module.entity';
import { GroupEventDataDto } from '../groups/dto/group-event.dto';
import { CreateEventDto } from '../events/dto/create-event.dto';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { EventsService } from '../events/events.service';
import { ProfessorsToBloqueModules } from '../professorsToBloqueModules/entity/professorsToBloqueModules.entity';

@Injectable()
export class BloqueModulesService {
  constructor(
    @InjectRepository(BloqueGroupModulesEntity)
    private moduleGroupRep: Repository<BloqueGroupModulesEntity>,
    @InjectRepository(BloqueGroupsEntity)
    private bloqueGroupRep: Repository<BloqueGroupsEntity>,
    @InjectRepository(ProfessorsEntity)
    private professorRepository: Repository<ProfessorsEntity>,
    @InjectRepository(ClassroomsEntity)
    private classroomsRepository: Repository<ClassroomsEntity>,
    @InjectRepository(ProfessorsToBloqueModules)
    private professorsToGroupsRepository: Repository<ProfessorsToBloqueModules>,
    @InjectRepository(ModuleEntity)
    private moduleRep: Repository<ModuleEntity>,
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Creates a new module group attached to a block group.
   * @param createReq The information of the module.
   * @returns
   */
  async create(groupId: string, moduleIds: string[]): Promise<ResponseStatus> {
    if (groupId == '' || moduleIds.length == 0) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Data cannot be empty.',
      );
    }
    const modules = await this.moduleRep
      .createQueryBuilder('module')
      .where('module.id = ANY(ARRAY[:...ids::uuid])', { ids: moduleIds })
      .getMany();
    const bloqueGroup = await this.bloqueGroupRep.findOne({
      where: { id: groupId },
    });
    if (modules && bloqueGroup) {
      const newEntities = [];
      for (let i = 0; i < modules.length; i++) {
        const newEntity = this.moduleGroupRep.create();
        newEntity.module = modules[i];
        newEntity.group = bloqueGroup;
        newEntities.push(newEntity);
      }
      const result = await this.moduleGroupRep.save(newEntities);
      // Get rid of the group attribute.
      result.forEach(function (v) {
        delete v.group;
      });
      return db.createResponseStatus(
        HttpStatus.CREATED,
        'Created successfully.',
        { groups: result, groupId: groupId },
      );
    }
    return db.createResponseStatus(
      HttpStatus.BAD_REQUEST,
      'Invalid request data.',
    );
  }

  /**
   * Find the group modules of a block group.
   * @param groupId The groupID to search for.
   * @returns The found ID's of the bloque Modules.
   */
  async findWithGroup(groupId: string): Promise<ResponseStatus> {
    const moduleGroups = await this.moduleGroupRep.find({
      where: { group: groupId },
      relations: ['module'],
    });
    return db.createResponseStatus(
      HttpStatus.OK,
      'Searched successfully',
      moduleGroups,
    );
  }

  /**
   * Finds all the groups that do not have any classroom assigned.
   * @param periodId The period which the group is part of.
   * @returns A response for the user.
   */
  async findRemaining(periodId: string): Promise<ResponseStatus> {
    const bloqueGroup = await this.bloqueGroupRep.find({
      where: { period: periodId },
    });
    const bloqueGroupIds = [];
    for (const group of bloqueGroup) {
      bloqueGroupIds.push(group.id);
    }
    if (bloqueGroup.length == 0) {
      return db.createResponseStatus(HttpStatus.OK, 'Successful search', []);
    }
    const result = await this.moduleGroupRep.find({
      where: { classroom: IsNull(), group: In(bloqueGroupIds) },
      order: { group: 'DESC' },
      relations: ['group', 'group.course21', 'module'],
    });
    if (result) {
      return db.createResponseStatus(
        HttpStatus.OK,
        'Successful search',
        result,
      );
    }
    return db.createResponseStatus(HttpStatus.NO_CONTENT, 'No groups found.');
  }

  /**
   * Creates a new event for a group module.
   * The professor and classroom needs to be available for the times defined for the event,
   * otherwise, a bad request response is arised.
   * @param groupId  The UUID of the group.
   * @param dtoData The data of the event.
   * @returns A response for the user.
   */
  async assignEvent(
    groupId: string,
    dtoData: GroupEventDataDto,
  ): Promise<ResponseStatus> {
    // Verify the length of both professors field.
    if (
      dtoData.professorsIds.length != dtoData.professorsResponsability.length
    ) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'professorsIds and professorsResponsability must be the same length.',
      );
    }
    // Verify that the responsability of the professors has the correct format.
    let sum = 0;
    for (const r of dtoData.professorsResponsability) {
      if (r <= 0 || r > 1) {
        return db.createResponseStatus(
          HttpStatus.BAD_REQUEST,
          'Elements in professorsResponsability field must be greater than 0 and less or equal than 1.',
        );
      }
      sum += r;
    }
    if (sum != 1) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'The sum of the elements in professorsResponsability field must be equal to 1.',
      );
    }
    // Check if the group exists.
    const group = await this.moduleGroupRep.findOne({
      where: { id: groupId },
      relations: ['group', 'group.course21', 'module'],
    });
    if (!group) {
      return db.createResponseStatus(
        HttpStatus.NOT_FOUND,
        'Group to update was not found.',
      );
    }
    // Check if the classroom exists.
    const classroom = await this.classroomsRepository.findOne({
      where: { id: dtoData.classroomId },
    });
    if (!classroom) {
      return db.createResponseStatus(
        HttpStatus.NOT_FOUND,
        'Classroom was not found.',
      );
    }
    const classroomCollision = await this.eventsService.searchClassroomCollision(
      classroom,
      dtoData.events,
      group.group.course21.initialWeek,
      group.group.course21.initialWeek + group.group.course21.weeks,
    );
    if (classroomCollision.valueOf()) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Classroom collision!',
      );
    }
    // Get the professors.
    const professors = await this.professorRepository.findByIds(
      dtoData.professorsIds,
    );
    if (professors.length != dtoData.professorsIds.length) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Invalid professor ID.',
      );
    }
    const professorCollision = await this.eventsService.searchProfessorsCollision(
      dtoData.professorsIds,
      dtoData.events,
      group.group.course21.initialWeek,
      group.group.course21.initialWeek + group.group.course21.weeks,
    );
    if (professorCollision.valueOf()) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Professor collision!',
      );
    }

    group.classroom = classroom;
    const relationships: ProfessorsToBloqueModules[] = [];
    for (let i = 0; i < professors.length; i++) {
      const professorGroup = this.professorsToGroupsRepository.create();
      professorGroup.group = group;
      professorGroup.responsabilityPercent =
        dtoData.professorsResponsability[i];
      professorGroup.professor = professors[i];
      relationships.push(professorGroup);
    }

    const eventReq = new CreateEventDto();
    eventReq.bloqueGroupId = groupId;
    eventReq.events = dtoData.events;
    const result = await this.eventsService.createEventTec21(eventReq);
    await this.professorRepository.save(professors);
    await this.moduleGroupRep.save(group);
    await this.professorsToGroupsRepository.save(relationships);
    const responseProfessors = [];
    for (let i = 0; i < professors.length; i++) {
      const id = professors[i].id;
      for (const relation of relationships) {
        if (relation.professor.id == id) {
          responseProfessors.push({
            professor: professors[i],
            responsabilityPercent: relation.responsabilityPercent,
          });
        }
      }
    }
    const response = [];
    for (const event of result) {
      response.push({ ...event, group: group, professors: responseProfessors });
    }
    return db.createResponseStatus(
      HttpStatus.CREATED,
      'Event created successfully',
      response,
    );
  }

  /**
   * Gets all the events that correspond to a group.
   * @param groupId The ID of the group to be added.
   * @returns A response for the user.
   */
  async getEvents(groupId: string): Promise<ResponseStatus> {
    const events = await this.eventsService.findEventTec21(groupId);
    if (!events) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Group not found.',
      );
    }
    return db.createResponseStatus(
      HttpStatus.OK,
      'Events successfully found.',
      events,
    );
  }

  /**
   * Removes an event from the group.
   * @param groupId The group UUID.
   * @param eventId The event UUID.
   * @returns A response for the user.
   */
  async removeEvent(groupId: string): Promise<ResponseStatus> {
    // Check if the group exists.
    const group = await this.moduleGroupRep.findOne({
      where: { id: groupId },
      relations: ['events'],
    });
    if (!group) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Group not found.',
      );
    }
    if (group.events.length == 0) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'There are no events for this group.',
      );
    }
    const valid = await this.eventsService.removeEvents(group.events);
    if (!valid.valueOf()) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Event not found.',
      );
    }
    group.events = [];
    // Remove the professors and classroom since there are no more events.
    group.classroom = null;
    await this.professorsToGroupsRepository.delete({ group: group });
    await this.moduleGroupRep.save(group);
    return db.createResponseStatus(
      HttpStatus.OK,
      'Event successfully deleted.',
    );
  }

  /**
   * Removes a module group from the database.
   * @param id The ID of the group to be deleted.
   * @returns A response message.
   */
  async remove(id: string): Promise<ResponseStatus> {
    const entity = await this.moduleGroupRep.findOne({
      where: { id: id },
    });
    if (entity) {
      await this.moduleGroupRep.delete({ id: id });
      return db.createResponseStatus(HttpStatus.OK, 'Successfully deleted.');
    }
    return db.createResponseStatus(
      HttpStatus.NOT_FOUND,
      'Entity to delete has not been found.',
    );
  }
}
