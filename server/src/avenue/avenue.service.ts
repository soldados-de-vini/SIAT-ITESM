import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';
import { ResponseStatus } from 'src/utils/interfaces/response';
import { Db, Repository } from 'typeorm';
import { AvenueDto } from './dto/avenue.dto';
import { AvenueEntity } from './entity/avenue.entity';
import { CreateAvenueReq } from './interface/create-avenue.interface';
import * as db from '../utils/db/crud-entity';

@Injectable()
export class AvenueService {
  constructor(
    @InjectRepository(AvenueEntity)
    private avenueRepository: Repository<AvenueEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Creates a new avenue in the database assigned to the user.
   * @param avenueReq The dto that represents the data of the module.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new avenue.
   */
  async create(
    avenueReq: CreateAvenueReq,
    uuid: string,
  ): Promise<ResponseStatus> {
    let avenues = [];
    for (let avenue of avenueReq.avenues) {
      let newAvenue = {
        name: avenue,
      };
      avenues.push(newAvenue);
    }

    avenueReq.avenues = avenues;

    return await db.createWithUserRelation<AvenueEntity, AvenueDto>(
      this.userRepository,
      this.avenueRepository,
      uuid,
      ['avenues'],
      avenueReq.avenues,
      'avenues',
    );
  }

  /**
   * Queries all the avenues of the user and sends them back.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    return db.findAll(uuid, 'avenues', this.userRepository, ['avenues']);
  }

  /**
   * Updates a course of the user.
   * @param userId User ID requesting to update.
   * @param avenueId The ID of the avenue to update.
   * @param updateAvenueDto The data up be replaced.
   * @returns A response with the new value as a result.
   */
  async update(
    userId: string,
    moduleId: string,
    updateAvenueDto: AvenueDto,
  ): Promise<ResponseStatus> {
    return db.update<AvenueEntity, AvenueDto>(
      userId,
      moduleId,
      updateAvenueDto,
      this.avenueRepository,
      { where: { id: moduleId } },
    );
  }

  /**
   * Remove a single avenue from the DB.
   * @param userId The ID of the user who made the request.
   * @param avenueId The ID of the avenue to be deleted.
   * @returns A response stating success or failure.
   */
  async remove(userId: string, avenueId: string): Promise<ResponseStatus> {
    return db.remove(userId, avenueId, this.avenueRepository, { id: avenueId });
  }
}
