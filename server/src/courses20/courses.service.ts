import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { Repository } from 'typeorm';
import { Course20Dto } from './dto/course20.dto';
import { CourseEntity } from './entity/course20.entity';
import { CreateCourseReq } from './interfaces/create-course-req.interface';
import * as db from '../utils/db/crud-entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Creates a new course assigned to the user in the database.
   * @param data The message from the user that represents the Courses to be created.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new courses created.
   */
  async create(data: CreateCourseReq, uuid: string): Promise<ResponseStatus> {
    return db.createWithUserRelation<CourseEntity, Course20Dto>(
      this.userRepository,
      this.coursesRepository,
      uuid,
      ['courses'],
      data.courses,
      'courses',
    );
  }

  /**
   * Finds all the TEC 20 courses.
   * @param uuid The id of the user doing the request.
   * @returns The TEC 20 courses.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    return db.findAll(uuid, 'courses', this.userRepository, ['courses']);
  }

  /**
   * Updates the a course of the user.
   * @param userId UserID requesting the update.
   * @param courseId The id of course to update.
   * @param updateCourseDto The data to update.
   * @returns An HTTP response with the new value as a result.
   */
  async update(
    userId: string,
    courseId: string,
    updateCourseDto: Course20Dto,
  ): Promise<ResponseStatus> {
    return db.update<CourseEntity, Course20Dto>(
      userId,
      courseId,
      updateCourseDto,
      this.coursesRepository,
      { where: { id: courseId } },
    );
  }

  /**
   * Remove a single course from the DB.
   * @param userId The ID of the user who made the request.
   * @param courseId The ID of the course to be deleted.
   * @returns A response stating success or failure.
   */
  async remove(userId: string, courseId: string): Promise<ResponseStatus> {
    return db.remove(userId, courseId, this.coursesRepository, {
      id: courseId,
    });
  }

  /**
   * Gets all the TEC20 assigned data of the current period.
   * @param uuid The UUID of the user.
   * @param periodId The UUID of the period.
   * @returns All the courses with the groups that have been assigned for this period.
   */
  async getTec20PeriodData(
    uuid: string,
    periodId: string,
  ): Promise<CourseEntity[]> {
    return await this.coursesRepository
      .createQueryBuilder('course')
      .innerJoin('course.user', 'user')
      .innerJoinAndSelect('course.groups', 'groups20')
      .innerJoin('groups20.period', 'groupPeriod20')
      .innerJoinAndSelect('groups20.classroom', 'classroom')
      .innerJoinAndSelect('groups20.professors', 'professors')
      .innerJoinAndSelect('professors.professor', 'professor')
      .innerJoinAndSelect('groups20.events', 'events')
      .where(
        '(user.id = :userId::uuid) AND (groupPeriod20.id = :periodId::uuid)',
        { userId: uuid, periodId: periodId },
      )
      .orderBy('course', 'ASC')
      .addOrderBy('groups20.number', 'ASC')
      .addOrderBy('events.weekDay', 'ASC')
      .getMany();
  }
}
