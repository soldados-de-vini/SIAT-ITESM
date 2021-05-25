import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { Repository } from 'typeorm';
import { ProfessorDto } from './dto/professor.dto';
import { ProfessorsEntity } from './entity/professors.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import * as db from '../utils/db/crud-entity';
import { CreateProfessorsReq } from './interfaces/createProfessorsReq';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { AvailableReq } from './interfaces/availableReq.interface';
import { EventsService } from '../events/events.service';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(ProfessorsEntity)
    private professorsRepository: Repository<ProfessorsEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Creates a new professor in the database assigned to the user.
   * @param createReq The request that holds the data of the professors.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new professors data.
   */
  async create(
    createReq: CreateProfessorsReq,
    uuid: string,
  ): Promise<ResponseStatus> {
    return db.createWithUserRelation<ProfessorsEntity, ProfessorDto>(
      this.userRepository,
      this.professorsRepository,
      uuid,
      ['professors'],
      createReq.professors,
      'professors',
    );
  }

  /**
   * Queries all the professors of the user and sends them back.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    return db.findAll(uuid, 'professors', this.userRepository, ['professors']);
  }

  /**
   * Queries all the professors that are available at the given times.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAvailable(
    uuid: string,
    data: AvailableReq,
  ): Promise<ResponseStatus> {
    if (data.groupId == null && data.bloqueGroupId == null) {
      return db.createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'At least a groupId or moduleGroupId must be specified.',
      );
    }
    const professors = await this.eventsService.findAvailableProfessors(
      uuid,
      data,
    );
    return db.createResponseStatus(
      HttpStatus.OK,
      'Searched successfully.',
      professors,
    );
  }

  /**
   * Updates a professor of the user.
   * @param userId The ID of the user.
   * @param professorId The ID of the professor to update.
   * @param updateProfessorDto The data to be replaced.
   * @returns A response with the new value as a result.
   */
  async update(
    userId: string,
    professorId: string,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<ResponseStatus> {
    return db.update<ProfessorsEntity, UpdateProfessorDto>(
      userId,
      professorId,
      updateProfessorDto,
      this.professorsRepository,
      { where: { id: professorId } },
    );
  }

  /**
   * Removes a single professor from the DB.
   * @param userId The ID of the user who made the request.
   * @param professorId The ID of the professor to be deleted.
   * @returns A resposne stating success or failure.
   */
  remove(userId: string, professorId: string) {
    return db.remove(userId, professorId, this.professorsRepository, {
      id: professorId,
    });
  }
}
