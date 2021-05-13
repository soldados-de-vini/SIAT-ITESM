import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateBloqueGroupReq } from './interfaces/create-req-group.interface';
import { BloqueGroupsEntity } from './entity/bloqueGroups.entity';
import { UpdateGroupDto } from '../groups/dto/update-group.dto';

@Injectable()
export class BloqueGroupsService {
  constructor(
    @InjectRepository(BloqueGroupsEntity)
    private bloqueGroupRepository: Repository<BloqueGroupsEntity>,
    @InjectRepository(PeriodsEntity)
    private periodRepository: Repository<PeriodsEntity>,
    @InjectRepository(Course21Entity)
    private course21Repository: Repository<Course21Entity>,
  ) {}

  /**
   * Creates a new TEC21 group in the database assigned to the user.
   * @param createReq The request that holds the data of the groups.
   * @returns A response to send back to the user with the new group data.
   */
  async create(
    createReq: CreateBloqueGroupReq,
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
      relations: ['bloqueGroups'],
    });
    if (period) {
      let courseEntities: Course21Entity[] = [];
      let newEntities: BloqueGroupsEntity[] = [];
      for (let group of createReq.groups) {
        // Check if the groups to be created are less than one.
        if (group.groupsAmount < 1) {
          return db.createResponseStatus(HttpStatus.BAD_REQUEST, `Invalid groupAmount [${group.groupsAmount}] in course [${group.courseKey}]`);
        }
        // Grab the corresponding course to verify that it exists.
        const course = await this.course21Repository.findOne({
          where: { key: group.courseKey, user: uuid },
        });
        if (course) {
          // Create the requested groups.
          const existingGroups = await this.bloqueGroupRepository.find({where: {course21: course.id}});
          for (let i = 1 + existingGroups.length; i <= group.groupsAmount + existingGroups.length; i++) {
            // Create new entity object with the provided information.
            const newEntity = this.bloqueGroupRepository.create();
            newEntity.number = i;
            newEntity.course21 = course;
            newEntity.matricula = group.matricula;
            newEntity.formato = group.formato;
            newEntities.push(newEntity);
            // Assign the new entity to the corresponding period and course.
            period.bloqueGroups.push(newEntity);
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
      await this.bloqueGroupRepository.save(newEntities);
      await this.periodRepository.save(period);
      await this.course21Repository.save(courseEntities);

      let response = this._insertCourseKey(newEntities);

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
    const result = await this.bloqueGroupRepository.find({
      where: { period: periodId },
      order: { course21: "DESC", number: "ASC"},
      relations: ['course21'],
    });
    if (result) {
      let resultGroups = this._insertCourseKey(result);
      return db.createResponseStatus(
        HttpStatus.OK,
        'Successful search',
        resultGroups,
      );
    }
    return db.createResponseStatus(HttpStatus.NO_CONTENT, 'No groups found.');
  }

  /**
   * Queries all the groups of a block and sends them back.
   * @param periodID The ID of the period.
   * @returns A response with the result of the lookup in the DB.
   */
   async findOne(periodId: string, courseId: string): Promise<ResponseStatus> {
    const result = await this.bloqueGroupRepository.find({
      where: { period: periodId, course21: courseId },
      order: { number: "ASC"},
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
   * Updates a block group.
   * @param groupId The ID of the group.
   * @param groupDto The BloqueGroupDto with the data to be updated.
   * @returns A response with the new value as a result.
   */
  async update(
    groupId: string,
    groupDto: UpdateGroupDto,
  ): Promise<ResponseStatus> {
    const toUpdate = await this.bloqueGroupRepository.findOne({
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
    const newValue = await this.bloqueGroupRepository.save(updated);

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
    const entity = await this.bloqueGroupRepository.findOne({
      where: { id: groupId },
    });
    if (entity) {
      await this.bloqueGroupRepository.delete({ id: groupId });
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
   _insertCourseKey(entities: BloqueGroupsEntity[]) {
    let response = [];
    for (let entity of entities) {
      const courseKey = entity.course21.key;
      delete entity.course21;
      response.push({...entity, courseKey: courseKey});
    }
    return response;
  }
}
