import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { GroupsEntity } from './entity/groups.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateGroupReq } from './interfaces/create-group.interface';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { UpdateGroupDto } from './dto/update-group.dto';
import { EventsService } from '../events/events.service';
import { GroupEventDataDto } from './dto/group-event.dto';
import { ProfessorsEntity } from '../professors/entity/professors.entity';
import { ClassroomsEntity } from 'src/classrooms/entity/classrooms.entity';
import { ProfessorsToGroups } from 'src/professorsToGroups/entity/professorsToGroups.entity';
import { CreateEventDto } from 'src/events/dto/create-event.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsEntity)
    private groupRepository: Repository<GroupsEntity>,
    @InjectRepository(PeriodsEntity)
    private periodRepository: Repository<PeriodsEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(ProfessorsEntity)
    private professorRepository: Repository<ProfessorsEntity>,
    @InjectRepository(ClassroomsEntity)
    private classroomsRepository: Repository<ClassroomsEntity>,
    @InjectRepository(ProfessorsToGroups)
    private professorsToGroupsRepository: Repository<ProfessorsToGroups>,
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Creates a new TEC20 group in the database assigned to the user.
   * @param createReq The request that holds the data of the groups.
   * @returns A response to send back to the user with the new group data.
   */
  async createGroup(
    createReq: CreateGroupReq,
    uuid: string,
  ): Promise<ResponseStatus> {
    if (createReq.groups.length == 0) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'No group data was provided.',
      );
    }
    // Get the period and courses that will have the entity added.
    const period = await this.periodRepository.findOne({
      where: { id: createReq.periodId, user: uuid },
      relations: ['groups'],
    });
    if (period) {
      const courseEntities: CourseEntity[] = [];
      const newEntities: GroupsEntity[] = [];
      for (const group of createReq.groups) {
        // Check if the groups to be created are less than one.
        if (group.groupsAmount < 1) {
          return db.createResponseStatus(
            HttpStatus.BAD_REQUEST,
            `Invalid groupAmount [${group.groupsAmount}] in course [${group.courseKey}]`,
          );
        }
        // Grab the corresponding course to verify that it exists.
        const course = await this.courseRepository.findOne({
          where: { key: group.courseKey, user: uuid },
        });
        if (course) {
          // Create the requested groups.
          const existingGroups = await this.groupRepository.find({
            where: { course: course.id, period: period },
          });
          for (
            let i = 1 + existingGroups.length;
            i <= group.groupsAmount + existingGroups.length;
            i++
          ) {
            // Create new entity object with the provided information.
            const newEntity = this.groupRepository.create();
            newEntity.number = i;
            newEntity.course = course;
            newEntity.matricula = group.matricula;
            newEntity.formato = group.formato;
            newEntities.push(newEntity);
            // Assign the new entity to the corresponding period and course.
            period.groups.push(newEntity);
          }
          courseEntities.push(course);
        } else {
          // Cancel the operation if one course ID is wrong.
          return db.createResponseStatus(
            HttpStatus.BAD_REQUEST,
            `Invalid course ID: ${group.courseKey}`,
          );
        }
      }
      // Save the relationship on the database.
      await this.groupRepository.save(newEntities);
      await this.periodRepository.save(period);
      await this.courseRepository.save(courseEntities);

      const response = this._insertCourseKey(newEntities);
      // Manually insert classrooms.
      for (let i = 0; i < response.length; i++) {
        response[i] = { ...response[i], classroom: null };
      }

      return db.createResponseStatus(
        HttpStatus.CREATED,
        'Created successfully.',
        response,
      );
    }
    return db.createResponseStatus(
      HttpStatus.BAD_REQUEST,
      `Invalid period ID: '${createReq.periodId}'`,
    );
  }

  /**
   * Queries all the groups of the period and sends them back.
   * @param periodID The ID of the period.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(periodId: string): Promise<ResponseStatus> {
    const result = await this.groupRepository.find({
      where: { period: periodId },
      order: { course: 'DESC', number: 'ASC' },
      relations: ['course', 'classroom'],
    });
    if (result) {
      const resultGroups = this._insertCourseKey(result);
      return db.createResponseStatus(
        HttpStatus.OK,
        'Successful search',
        resultGroups,
      );
    }
    return db.createResponseStatus(HttpStatus.NO_CONTENT, 'No groups found.');
  }

  /**
   * Finds all the groups that do not have any classroom assigned.
   * @param periodId The period which the group is part of.
   * @returns A response for the user.
   */
  async findRemaining(periodId: string): Promise<ResponseStatus> {
    const result = await this.groupRepository.find({
      where: { period: periodId, classroom: IsNull() },
      order: { course: 'DESC', number: 'ASC' },
      relations: ['course'],
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
   * Queries all the groups of a course and sends them back.
   * @param periodID The ID of the period.
   * @returns A response with the result of the lookup in the DB.
   */
  async findOne(periodId: string, courseId: string): Promise<ResponseStatus> {
    const result = await this.groupRepository.find({
      where: { period: periodId, course: courseId },
      order: { number: 'ASC' },
      relations: ['classroom'],
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
   * Updates a group.
   * @param groupId The ID of the group.
   * @param groupDto The UpdateGroupDto with the data to be updated.
   * @returns A response with the new value as a result.
   */
  async update(
    groupId: string,
    groupDto: UpdateGroupDto,
  ): Promise<ResponseStatus> {
    const toUpdate = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    // Check if the object exists.
    if (!toUpdate) {
      return db.createResponseStatus(
        HttpStatus.NOT_FOUND,
        'Entity to update has not been found.',
      );
    }
    const updated = Object.assign(toUpdate, groupDto);
    const newValue = await this.groupRepository.save(updated);

    return db.createResponseStatus(
      HttpStatus.OK,
      'Updated successfully.',
      newValue,
    );
  }

  /**
   * Creates a new event for a group.
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
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['course'],
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
    );
    if (professorCollision.valueOf()) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Professor collision!',
      );
    }

    group.classroom = classroom;
    const relationships: ProfessorsToGroups[] = [];
    for (let i = 0; i < professors.length; i++) {
      const professorGroup = this.professorsToGroupsRepository.create();
      professorGroup.group = group;
      professorGroup.responsabilityPercent =
        dtoData.professorsResponsability[i];
      professorGroup.professor = professors[i];
      relationships.push(professorGroup);
    }

    const eventReq = new CreateEventDto();
    eventReq.groupId = groupId;
    eventReq.events = dtoData.events;
    const result = await this.eventsService.createEventTec20(eventReq);
    await this.professorRepository.save(professors);
    await this.groupRepository.save(group);
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
    const events = await this.eventsService.findEventTec20(groupId);
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
    const group = await this.groupRepository.findOne({
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
    // Remove the professors and classroom since there are no events.
    group.classroom = null;
    await this.professorsToGroupsRepository.delete({ group: group });
    await this.groupRepository.save(group);
    return db.createResponseStatus(
      HttpStatus.OK,
      'Event successfully deleted.',
    );
  }

  /**
   * Removes a group from the user.
   * @param groupId The ID of the group.
   * @returns A status message stating success or failure.
   */
  async remove(groupId: string): Promise<ResponseStatus> {
    const entity = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (entity) {
      await this.groupRepository.delete({ id: groupId });
      return db.createResponseStatus(HttpStatus.OK, 'Successfully deleted.');
    }
    return db.createResponseStatus(
      HttpStatus.NOT_FOUND,
      'Entity to delete has not been found.',
    );
  }

  /**
   * Removes the course information and inserts only the course key.
   * @param entities The group entities to do this operation.
   * @returns The entities with the course key added.
   */
  _insertCourseKey(entities: GroupsEntity[]) {
    const response = [];
    for (const entity of entities) {
      const courseKey = entity.course.key;
      delete entity.course;
      response.push({ ...entity, courseKey: courseKey });
    }
    return response;
  }
}
