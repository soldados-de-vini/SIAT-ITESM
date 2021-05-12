import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { GroupsEntity } from './entity/groups.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateGroupReq } from './interfaces/create-group.interface';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

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
      let courseEntities: CourseEntity[] = [];
      let newEntities: GroupsEntity[] = [];
      for (let group of createReq.groups) {
        // Check if the groups to be created are less than one.
        if (group.groupsAmount < 1) {
          return db.createResponseStatus(HttpStatus.BAD_REQUEST, `Invalid groupAmount [${group.groupsAmount}] in course [${group.courseKey}]`);
        }
        // Grab the corresponding course to verify that it exists.
        const course = await this.courseRepository.findOne({
          where: { key: group.courseKey, user: uuid },
        });
        if (course) {
          // Create the requested groups.
          const existingGroups = await this.groupRepository.find({where: {course: course.id}});
          for (let i = 1 + existingGroups.length; i <= group.groupsAmount + existingGroups.length; i++) {
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

      let response = [];
      let previousCourse = '';
      for (let entity of newEntities) {
        const courseKey = entity.course.key;
        delete entity.course;
        if (courseKey == previousCourse) {
          // The latest element in the array it's where the assigned group should be.
          response[response.length - 1].groups.push(entity);
        } else {
          // Delete the course information and add to the response a new dictionary.
          previousCourse = courseKey;
          response.push({courseKey: courseKey, groups: [entity]});
        }
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
      order: { course: "DESC", number: "ASC"},
      relations: ['course', 'classroom'],
    });
    if (result) {
      const resultGroups = [];
      let previousCourse: CourseEntity;
      for (let i = 0; i < result.length; i++) {
        if (previousCourse && previousCourse.id == result[i].course.id) {
          delete result[i].course;
          resultGroups[resultGroups.length - 1].groups.push(result[i]);
        } else {
          previousCourse = {...result[i].course};
          delete result[i].course;
          resultGroups.push({
            course: previousCourse,
            groups: [result[i]],
          });
        }
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
   * Queries all the groups of a course and sends them back.
   * @param periodID The ID of the period.
   * @returns A response with the result of the lookup in the DB.
   */
   async findOne(periodId: string, courseId: string): Promise<ResponseStatus> {
    const result = await this.groupRepository.find({
      where: { period: periodId, course: courseId },
      order: { number: "ASC"},
      relations: ['classroom'],
    });
    if (result) {
      const resultGroups = [];
      for (let i = 0; i < result.length; i++) {
        resultGroups.push(result[i]);
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
}
