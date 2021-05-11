import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueGroupsEntity } from '../bloque-groups/entity/bloqueGroups.entity';
import { Repository } from 'typeorm';
import * as db from '../utils/db/crud-entity';
import { BloqueGroupModulesEntity } from './entity/bloque-modules.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { ModuleEntity } from '../module/entity/module.entity';

@Injectable()
export class BloqueModulesService {
  constructor(
    @InjectRepository(BloqueGroupModulesEntity)
    private moduleGroupRep: Repository<BloqueGroupModulesEntity>,
    @InjectRepository(BloqueGroupsEntity)
    private bloqueGroupRep: Repository<BloqueGroupsEntity>,
    @InjectRepository(ModuleEntity)
    private moduleRep: Repository<ModuleEntity>,
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
