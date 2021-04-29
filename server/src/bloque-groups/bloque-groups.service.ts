import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { PeriodsEntity } from '../periods/entity/periods.entity';
import { Not, Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { BloqueGroupDto } from './dto/bloque-group.dto';
import { CreateBloqueGroupReq } from './interfaces/create-req-group.interface';
import { BloqueGroupsEntity } from './entity/bloqueGroups.entity';

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
        HttpStatus.NO_CONTENT,
        'No create data was provided.',
      );
    }
    // Check the existing numbers of the groups of that course.
    const existingGroups = await this.bloqueGroupRepository.find({
      where: { course21: createReq.course21Id },
    });
    const existingNumbers = [];
    for (const i in existingGroups) {
      existingNumbers.push(existingGroups[i].number);
    }
    // Get the period and courses that will have the entity added.
    const period = await this.periodRepository.findOne({
      where: { id: createReq.periodId, user: uuid },
      relations: ['bloqueGroups'],
    });
    const course = await this.course21Repository.findOne({
      where: { id: createReq.course21Id, user: uuid },
      relations: ['bloqueGroups'],
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
        const newEntity = this.bloqueGroupRepository.create(currentGroup);
        resultEntities.push(newEntity);
        // Assign the new entity to the corresponding period and course.
        period.bloqueGroups.push(newEntity);
        course.bloqueGroups.push(newEntity);
      }
      // Save the relationship on the database.
      await this.bloqueGroupRepository.save(resultEntities);
      await this.periodRepository.save(period);
      await this.course21Repository.save(course);
      if (resultEntities.length > 0) {
        for (let i = 0; i < resultEntities.length; i++) {
          const current = resultEntities[i];
          resultEntities[i] = {
            ...this._bloqueGroupEntityToResult(current),
            course21Id: createReq.course21Id,
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
    const result = await this.bloqueGroupRepository.find({
      where: { period: periodId },
      relations: ['course21', 'period'],
    });
    if (result) {
      const resultGroups = [];
      for (let i = 0; i < result.length; i++) {
        resultGroups.push({
          ...this._bloqueGroupEntityToResult(result[i]),
          course21Id: result[i].course21.id,
          periodId: result[i].period.id,
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
   * Updates a block group.
   * @param groupId The ID of the group.
   * @param groupDto The BloqueGroupDto with the data to be updated.
   * @returns A response with the new value as a result.
   */
  async update(
    groupId: string,
    groupDto: BloqueGroupDto,
  ): Promise<ResponseStatus> {
    const toUpdate = await this.bloqueGroupRepository.findOne({
      where: { id: groupId },
      relations: ['course21', 'period'],
    });
    // Check if the object exists.
    if (!toUpdate) {
      return db.createResponseStatus(
        HttpStatus.NOT_FOUND,
        'Entity to update has not been found.',
      );
    }
    // Check the existing numbers of the groups of that course.
    const existingGroups = await this.bloqueGroupRepository.find({
      where: { course21: toUpdate.course21.id, id: Not(groupId) },
    });
    const existingNumbers = [];
    for (const i in existingGroups) {
      existingNumbers.push(existingGroups[i].number);
    }
    if (existingNumbers.indexOf(groupDto.number) != -1) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Course number already exists.',
      );
    }
    const updated = Object.assign(toUpdate, groupDto);
    const newValue = await this.bloqueGroupRepository.save(updated);
    const result = {
      ...this._bloqueGroupEntityToResult(newValue),
      course21Id: toUpdate.course21.id,
      periodId: toUpdate.period.id,
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
   * Converts a bloque group entity result from the database into a format for the user.
   * @param result The result from the db.
   * @param courseId An object that contains the ID attribute to send back.
   * @returns The entity to send back to the user.
   */
  _bloqueGroupEntityToResult(result: BloqueGroupsEntity) {
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
