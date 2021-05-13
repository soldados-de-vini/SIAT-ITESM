import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { GroupsEntity } from './entity/groups.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateGroupReq } from './interfaces/create-group.interface';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsEntity)
    private groupRepository: Repository<GroupsEntity>,
    @InjectRepository(PeriodsEntity)
    private periodRepository: Repository<PeriodsEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
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
        HttpStatus.NO_CONTENT,
        'No create data was provided.',
      );
    }
    // Check the existing numbers of the groups of that course.
    const existingGroups = await this.groupRepository.find({
      where: { course: createReq.courseId },
    });
    const existingNumbers = [];
    for (const i in existingGroups) {
      existingNumbers.push(existingGroups[i].number);
    }
    // Get the period and courses that will have the entity added.
    const period = await this.periodRepository.findOne({
      where: { id: createReq.periodId, user: uuid },
      relations: ['groups'],
    });
    const course = await this.courseRepository.findOne({
      where: { id: createReq.courseId, user: uuid },
      relations: ['groups'],
    });
    if (period && course) {
      const resultEntities = [];
      for (let i = 0; i < createReq.groups.length; i++) {
        const currentGroup = createReq.groups[i];
        // Verify that the group does not exists.
        if (existingNumbers.length > 0) {
          if (existingNumbers.indexOf(currentGroup.number) != -1) {
            return db.createResponseStatus(
              HttpStatus.BAD_REQUEST,
              'Group number already exists in one of the groups.',
            );
          }
        }
        // Create new entity object with the provided information.
        const newEntity = this.groupRepository.create(currentGroup);
        resultEntities.push(newEntity);
        // Assign the new entity to the corresponding period and course.
        period.groups.push(newEntity);
        course.groups.push(newEntity);
      }
      // Save the relationship on the database.
      await this.groupRepository.save(resultEntities);
      await this.periodRepository.save(period);
      await this.courseRepository.save(course);
      if (resultEntities.length > 0) {
        for (let i = 0; i < resultEntities.length; i++) {
          const current = resultEntities[i];
          resultEntities[i] = {
            ...this._groupEntityToResult(current),
            courseId: createReq.courseId,
            periodId: createReq.periodId,
          };
        }
      }
      return db.createResponseStatus(
        HttpStatus.CREATED,
        'Created successfully.',
        resultEntities,
      );
    }
    return db.createResponseStatus(
      HttpStatus.BAD_REQUEST,
      'Invalid course or period ID.',
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
      relations: ['course', 'period', 'classroom'],
    });
    if (result) {
      const resultGroups = [];
      for (let i = 0; i < result.length; i++) {
        resultGroups.push({
          ...this._groupEntityToResult(result[i]),
          courseId: result[i].course.id,
          periodId: result[i].period.id,
          classroom: result[i].classroom,
        });
      }
      return db.createResponseStatus(
        HttpStatus.OK,
        'Successful search',
        resultGroups,
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
  async update(groupId: string, groupDto: GroupDto): Promise<ResponseStatus> {
    const toUpdate = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['course', 'period', 'classroom'],
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
    const result = {
      ...this._groupEntityToResult(newValue),
      courseId: toUpdate.course.id,
      periodId: toUpdate.period.id,
      classroom: toUpdate.classroom == null ? null : toUpdate.classroom.id,
    };

    return db.createResponseStatus(
      HttpStatus.OK,
      'Updated successfully.',
      result,
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
   * Converts a group entity result from the database into a format for the user.
   * @param result The result from the db.
   * @param courseId An object that contains the ID attribute to send back.
   * @returns The entity to send back to the user.
   */
  _groupEntityToResult(result: GroupsEntity) {
    return {
      id: result.id,
      number: result.number,
      startDate: result.startDateString,
      endDate: result.endDateString,
      matricula: result.matricula,
      formato: result.formato,
    };
  }
}
