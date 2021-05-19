import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as db from '../utils/db/crud-entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { ModuleDto } from './dto/module.dto';
import { ModuleEntity } from './entity/module.entity';
import { CreateModuleReq } from './interface/create-module.interface';
import { ResponseStatus } from '../utils/interfaces/response';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Creates a new module in the database assigned to the user.
   * @param moduleReq The dto that represents the data of the module.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new modules.
   */
  async create(
    moduleReq: CreateModuleReq,
    uuid: string,
  ): Promise<ResponseStatus> {
    return await db.createWithUserRelation<ModuleEntity, ModuleDto>(
      this.userRepository,
      this.moduleRepository,
      uuid,
      ['modules'],
      moduleReq.modules,
      'modules',
    );
  }

  /**
   * Queries all the modules of the user and sends them back.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    return db.findAll(uuid, 'modules', this.userRepository, ['modules']);
  }

  /**
   * Updates a course of the user.
   * @param userId User ID requesting to update.
   * @param moduleId The ID of the module to update.
   * @param updateModuleDto The data up be replaced.
   * @returns A response with the new value as a result.
   */
  async update(
    userId: string,
    moduleId: string,
    updateModuleDto: ModuleDto,
  ): Promise<ResponseStatus> {
    return db.update<ModuleEntity, ModuleDto>(
      userId,
      moduleId,
      updateModuleDto,
      this.moduleRepository,
      { where: { id: moduleId } },
    );
  }

  /**
   * Remove a single module from the DB.
   * @param userId The ID of the user who made the request.
   * @param moduleId The ID of the module to be deleted.
   * @returns A response stating success or failure.
   */
  async remove(userId: string, moduleId: string): Promise<ResponseStatus> {
    return db.remove(userId, moduleId, this.moduleRepository, { id: moduleId });
  }
}
