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
  async remove(userId: string, professorId: string): Promise<ResponseStatus> {
    return db.remove(userId, professorId, this.professorsRepository, {
      id: professorId,
    });
  }

  /**
   * Gets the TEC 20 period data of the professor.
   * @param uuid The UUID of the user.
   * @param periodId The UUID of the period.
   * @returns The professor data separated by TEC 20 and TEC 21.
   */
  async getProfessorPeriodDataTec20(uuid: string, periodId: string) {
    const tec20Info = await this.professorsRepository
      .createQueryBuilder('professor')
      .innerJoin('professor.user', 'user')
      .innerJoin('professor.groups20', 'groups20')
      .innerJoin('groups20.group', 'group20')
      .innerJoin('group20.course', 'course20')
      .innerJoin('group20.period', 'period20')
      .select('professor.nomina', 'nomina')
      .addSelect('professor.name', 'nombre')
      .addSelect('professor.area', 'area')
      .addSelect('professor.coordination', 'coordinacion')
      .addSelect('professor.email', 'email')
      .addSelect('professor.loadLimit', 'limite_carga')
      .addSelect(
        'sum(course20.udc::real * groups20."responsabilityPercent"::real)::real',
        'udcs',
      )
      .where('(user.id = :userId::uuid) AND (period20.id = :periodId::uuid)', {
        userId: uuid,
        periodId: periodId,
      })
      .groupBy('professor.nomina')
      .addGroupBy('professor.name')
      .addGroupBy('professor.area')
      .addGroupBy('professor.coordination')
      .addGroupBy('professor.email')
      .addGroupBy('professor.loadLimit')
      .addGroupBy('groups20.responsabilityPercent')
      .addGroupBy('course20.udc')
      .getRawMany();
    return tec20Info;
  }

  /**
   * Gets the TEC 21 period data of the professor.
   * @param uuid The UUID of the user.
   * @param periodId The UUID of the period.
   * @returns The professor data separated by TEC 20 and TEC 21.
   */
  async getProfessorPeriodDataTec21(uuid: string, periodId: string) {
    const tec21Info = await this.professorsRepository
      .createQueryBuilder('professor')
      .innerJoin('professor.user', 'user')
      .innerJoin('professor.groups21', 'groups21')
      .innerJoin('groups21.group', 'moduleG21')
      .innerJoin('moduleG21.group', 'group21')
      .innerJoin('group21.course21', 'course21')
      .innerJoin('group21.period', 'period21')
      .innerJoin('moduleG21.events', 'events21')
      .select('professor.nomina', 'nomina')
      .addSelect('professor.name', 'nombre')
      .addSelect('professor.area', 'area')
      .addSelect('professor.coordination', 'coordinacion')
      .addSelect('professor.email', 'email')
      .addSelect('professor.loadLimit', 'limite_carga')
      .addSelect('course21.weeks::integer', 'courseWeeks')
      .addSelect(
        'sum((events21.endTime - events21.startTime) * groups21.responsabilityPercent)',
        'sumTec21',
      )
      .where('(user.id = :userId::uuid) AND (period21.id = :periodId::uuid)', {
        userId: uuid,
        periodId: periodId,
      })
      .groupBy('professor.nomina')
      .addGroupBy('professor.name')
      .addGroupBy('professor.area')
      .addGroupBy('professor.coordination')
      .addGroupBy('professor.email')
      .addGroupBy('professor.loadLimit')
      .addGroupBy('course21.weeks')
      .getRawMany();
    return tec21Info;
  }
}
