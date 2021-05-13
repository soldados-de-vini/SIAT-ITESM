import { UsersEntity } from '../../users/entity/users.entity';
import { FindConditions, FindOneOptions, ObjectID, Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatus } from '../interfaces/response';

/**
 * Creates a new entity with a relationship with the user.
 * @param userRepository The TypeORM repository of UsersEntity.
 * @param typeRepository The TypeORM repository of the entity to be created.
 * @param uuid The ID of the user.
 * @param relations The relations to considered during creation.
 * @param data The dto of the entity.
 * @param userAttribute The name of the attribute of the entity in the user entity.
 * @returns A ResponseStatus to send back to the user.
 */
async function createWithUserRelation<TypeEntity, TypeDto>(
  userRepository: Repository<UsersEntity>,
  typeRepository: Repository<TypeEntity>,
  uuid: string,
  relations: string[],
  data: TypeDto[],
  userAttribute: string,
): Promise<ResponseStatus> {
  if (data.length == 0) {
    return createResponseStatus(
      HttpStatus.NO_CONTENT,
      'No create data was provided.',
    );
  }
  // Get the user that will have the entity added.
  const user = await userRepository.findOne({
    where: { id: uuid },
    relations: relations,
  });
  const resultEntities = [];
  for (let i = 0; i < data.length; i++) {
    // Create new entity object with the provided information.
    const newEntity = typeRepository.create(data[i]);
    resultEntities.push(newEntity);
    await typeRepository.save(newEntity);
    // Assign the new entity to the user that created it.
    user[userAttribute].push(newEntity);
  }
  // Save the relationship on the database.
  await userRepository.save(user);
  return createResponseStatus(
    HttpStatus.CREATED,
    'Created successfully.',
    resultEntities,
  );
}

/**
 * Creates a new entity with a relationship with the parent entity.
 * @param userRepository The TypeORM repository of parent entity.
 * @param typeRepository The TypeORM repository of the entity to be created.
 * @param condition Condition to find the parent object.
 * @param data The dto of the entity.
 * @param userAttribute The name of the attribute of the entity in the parent entity.
 * @returns A ResponseStatus to send back to the user.
 */
async function createWithRelation<TypeEntity, TypeDto, TypeParentEntity>(
  parentRepository: Repository<TypeParentEntity>,
  typeRepository: Repository<TypeEntity>,
  options: FindOneOptions<TypeParentEntity>,
  data: TypeDto[],
  parentAttribute: string,
): Promise<ResponseStatus> {
  if (data.length == 0) {
    return createResponseStatus(
      HttpStatus.NO_CONTENT,
      'No create data was provided.',
    );
  }
  // Get the parent that will have the entity added.
  const parent = await parentRepository.findOne(options);
  const resultEntities = [];
  for (let i = 0; i < data.length; i++) {
    // Create new entity object with the provided information.
    const newEntity = typeRepository.create(data[i]);
    resultEntities.push(newEntity);
    await typeRepository.save(newEntity);
    // Assign the new entity to the user that created it.
    parent[parentAttribute].push(newEntity);
  }
  // Save the relationship on the database.
  await parentRepository.save(parent);
  return createResponseStatus(
    HttpStatus.CREATED,
    'Created successfully.',
    resultEntities,
  );
}

/**
 * Finds all the entities that have a relationship with user.
 * @param uuid The id of the user.
 * @param userEntityAttrName The name of the attribute of the entity in the user object.
 * @param userRepository The repository of the users entity.
 * @param relations The entity relationships to be fetched from the database.
 * @returns A response to send back to the user with the result.
 */
async function findAll(
  uuid: string,
  userEntityAttrName: string,
  userRepository: Repository<UsersEntity>,
  relations: string[],
): Promise<ResponseStatus> {
  const user = await getUserWithEntities(uuid, relations, userRepository);
  return createResponseStatus(
    HttpStatus.OK,
    'Searched user data successfully.',
    user[userEntityAttrName],
  );
}

async function findOne<Type>(
  id: string,
  typeRepository: Repository<Type>,
  findOptions: FindOneOptions,
) {
  const entity = await typeRepository.findOne(findOptions);
  if (entity) {
    return createResponseStatus(
      HttpStatus.OK,
      'Searched user data successfully.',
      entity,
    );
  }
  return createResponseStatus(HttpStatus.NO_CONTENT, 'Found no data.');
}

/**
 * Finds the user entities with the given condition.
 * @param uuid The id of the user.
 * @param typeRepository The repository of the entity that belongs to the user.
 * @param entityName The name of the entity.
 * @param condition The condition used to find the entity.
 * @param joinRelation OPTIONAL. Condition of relation to JOIN.
 * @returns The entities that were found given the conditions.
 */
async function findWithCondition<TypeEntity>(
  uuid: string,
  typeRepository: Repository<TypeEntity>,
  entityName: string,
  condition: string,
  joinRelation?: string,
): Promise<ResponseStatus> {
  const builder = typeRepository.createQueryBuilder(entityName);
  if (joinRelation != null) {
    builder.leftJoinAndSelect(joinRelation, 'alias1');
  }
  const entities = await builder
    .where(`${condition} AND ${entityName}.userId = :userId`, {
      userId: uuid,
    })
    .getMany();
  return createResponseStatus(
    HttpStatus.OK,
    `Searched ${entityName} data successfully`,
    entities,
  );
}

/**
 * Updates an entity that belongs to a user.
 * @param userId The ID of the user.
 * @param entityId The ID of the entity.
 * @param dto The DTO of the entity.
 * @param typeRepository The TypeORM repository of the entity.
 * @returns A ResponseStatus that states de success or failure of the operation.
 */
async function update<TypeEntity, TypeDto>(
  userId: string,
  entityId: string,
  dto: TypeDto,
  typeRepository: Repository<TypeEntity>,
  findOptions: FindOneOptions,
) {
  const toUpdate = await typeRepository.findOne(findOptions);
  const idRetrieved = await getEntityUserId(entityId, typeRepository);
  // Check if the object exists.
  if (toUpdate) {
    // Check if the object belongs to the user.
    if (idRetrieved == userId) {
      const updated = Object.assign(toUpdate, dto);
      const newValue = await typeRepository.save(updated);
      return createResponseStatus(
        HttpStatus.OK,
        'Updated successfully.',
        newValue,
      );
    }
    return createResponseStatus(
      HttpStatus.UNAUTHORIZED,
      'Unauthorized update.',
    );
  }
  return createResponseStatus(
    HttpStatus.NOT_FOUND,
    'Entity to update has not been found.',
  );
}

/**
 * Removes an entity from the database.
 * @param userId The ID of the user.
 * @param entityId The ID of the entity.
 * @param typeRepository The repository of the entity.
 * @param deleteCondition The condition used to search the entity to be deleted.
 * @returns A response stating success or failure of the operation.
 */
async function remove<TypeEntity>(
  userId: string,
  entityId: string,
  typeRepository: Repository<TypeEntity>,
  deleteCondition:
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectID
    | ObjectID[]
    | FindConditions<TypeEntity>,
): Promise<ResponseStatus> {
  const idRetrieved = await getEntityUserId<TypeEntity>(
    entityId,
    typeRepository,
  );
  // Verify that the course exists.
  if (idRetrieved) {
    // Check if the requested deletion belongs to the user.
    if (idRetrieved == userId) {
      await typeRepository.delete(deleteCondition);
      return createResponseStatus(HttpStatus.OK, 'Successfully deleted.');
    }
    return createResponseStatus(
      HttpStatus.UNAUTHORIZED,
      'Unauthorized deletion.',
    );
  }
  return createResponseStatus(
    HttpStatus.NOT_FOUND,
    'Entity to delete has not been found.',
  );
}

/**
 * Gets the user information with the provided relationship populated.
 * @param uuid The id of the user.
 * @param relations The relations to be found when fetching.
 * @param userRepository An TypeORM repository object of UsersEntity.
 * @returns An UsersEntity object populated.
 */
async function getUserWithEntities(
  uuid: string,
  relations: string[],
  userRepository: Repository<UsersEntity>,
): Promise<UsersEntity> {
  return await userRepository.findOne({
    where: { id: uuid },
    relations: relations,
  });
}

/**
 * Gets the user ID assigned to the entity identified by the ID provided.
 * IMPORTANT: The entity must have a relationship with the user.
 * @param entityId ID of the entity
 * @returns The id of the user or null if the relation is not present.
 */
async function getEntityUserId<TypeRepo>(
  entityId: string,
  entityRepository: Repository<TypeRepo>,
): Promise<string> {
  const entity = await entityRepository.findOne({
    where: { id: entityId },
    relations: ['user'],
  });
  if (entity) {
    return entity['user'].id;
  }
  return null;
}

/**
 * Creates a new ResponseStatus object with the parameters provided.
 * @param statusCode The status code to send back to the user.
 * @param message The message to display to the user.
 * @param result Optional result attached to the response.
 * @returns The ResponseStatus object.
 */
async function createResponseStatus(
  statusCode: HttpStatus,
  message: string,
  result?: any,
) {
  const response: ResponseStatus = {
    status: {
      statusCode: statusCode,
      message: message,
    },
  };
  if (result) {
    response.result = result;
  }
  return response;
}

export {
  createResponseStatus,
  createWithUserRelation,
  createWithRelation,
  findAll,
  findOne,
  findWithCondition,
  update,
  remove,
};
