import { Injectable } from '@nestjs/common';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreatePeriodsReq } from './interfaces/create-period.interface';
import * as db from '../utils/db/crud-entity';
import { PeriodsEntity } from './entity/periods.entity';
import { PeriodDto } from './dto/period.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/entity/users.entity';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectRepository(PeriodsEntity)
    private periodsRepository: Repository<PeriodsEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Creates a new period in the database assigned to the user.
   * @param createPeriodDto The request that holds the data of the period.
   * @param uuid The ID of the user.
   * @returns A response to send back to the user with the new periods data.
   */
  async create(
    createPeriodDto: CreatePeriodsReq,
    uuid: string,
  ): Promise<ResponseStatus> {
    const result = await db.createWithUserRelation<PeriodsEntity, PeriodDto>(
      this.userRepository,
      this.periodsRepository,
      uuid,
      ['periods'],
      createPeriodDto.periods,
      'periods',
    );
    if (result.result) {
      for (let i = 0; i < result.result.length; i++) {
        result.result[i] = this._periodEntityToResult(result.result[i]);
      }
    }
    return result;
  }

  /**
   * Queries all the periods of the user and sends them back.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    const result = await db.findAll(uuid, 'periods', this.userRepository, [
      'periods',
    ]);
    if (result.result) {
      for (let i = 0; i < result.result.length; i++) {
        result.result[i] = this._periodEntityToResult(result.result[i]);
      }
    }
    return result;
  }

  /**
   * Queries a single period given the uuid.
   * @param periodId The uuid of the period.
   * @returns The result of the query.
   */
  async findOne(periodId: string): Promise<ResponseStatus> {
    const result = await db.findOne(periodId, this.periodsRepository, {
      where: { id: periodId },
    });
    if (result.result) {
      result.result = this._periodEntityToResult(result.result);
    }
    return result;
  }

  /**
   * Updates a period of the user.
   * @param userId The ID of the user.
   * @param periodId The ID of the professor to update.
   * @param periodDto The data to be replaced.
   * @returns A response with the new value as a result.
   */
  async update(
    userId: string,
    periodId: string,
    periodDto: PeriodDto,
  ): Promise<ResponseStatus> {
    const result = await db.update<PeriodsEntity, PeriodDto>(
      userId,
      periodId,
      periodDto,
      this.periodsRepository,
      { where: { id: periodId } },
    );
    if (result.result) {
      result.result = this._periodEntityToResult(result.result);
    }
    return result;
  }

  /**
   * Removes a period from the user.
   * @param userId The ID of the user.
   * @param periodId The ID of the period.
   * @returns A status message stating success or failure.
   */
  async remove(userId: string, periodId: string): Promise<ResponseStatus> {
    return db.remove<PeriodsEntity>(userId, periodId, this.periodsRepository, {
      id: periodId,
    });
  }

  /**
   * Converts a period entity result from the database into a format for the user.
   * @param result The result from the db.
   * @returns The entity to send back to the user.
   */
  _periodEntityToResult(result: any) {
    return {
      id: result.id,
      name: result.name,
      startDate: result.startDateString,
      endDate: result.endDateString,
      vacations: result.vacations,
    };
  }
}
