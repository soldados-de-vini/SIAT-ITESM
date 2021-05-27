import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from '../module/entity/module.entity';
import { ModuleService } from '../module/module.service';
import { UsersEntity } from '../users/entity/users.entity';
import { createResponseStatus } from '../utils/db/crud-entity';
import { Repository } from 'typeorm';
import { Course21Dto } from './dto/course21.dto';
import { Course21Entity } from './entities/course21.entity';
import { CreateCourse21Req } from './interfaces/create-courses21-req.interface';
import * as db from '../utils/db/crud-entity';
import { ResponseStatus } from '../utils/interfaces/response';

@Injectable()
export class Courses21Service {
  constructor(
    @InjectRepository(Course21Entity)
    private coursesRepository: Repository<Course21Entity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private moduleService: ModuleService,
  ) {}

  /**
   * Creates a new course assigned to the user in the database.
   * @param request The message from the user that represents the Courses21 to be created.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new courses created.
   */
  async create(
    request: CreateCourse21Req,
    uuid: string,
  ): Promise<ResponseStatus> {
    const modules = (await this.moduleService.findAll(uuid)).result;
    const courses = request.courses;
    const coursesWithModules = [];
    for (const i in courses) {
      const course = courses[i];
      const newCourse = this.matchCourseWithModules(course, modules);
      if (newCourse == null) {
        createResponseStatus(
          HttpStatus.BAD_REQUEST,
          'Not a valid module id was found for one of the courses',
        );
      }
      coursesWithModules.push(newCourse);
    }
    return db.createWithUserRelation<Course21Entity, Course21Dto>(
      this.userRepository,
      this.coursesRepository,
      uuid,
      ['courses21'],
      coursesWithModules,
      'courses21',
    );
  }

  /**
   * Finds all the TEC21 courses.
   * @param uuid The id of the user doing the request.
   * @returns The courses that are modules or bloques.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    return db.findAll(uuid, 'courses21', this.userRepository, [
      'courses21',
      'courses21.modules',
    ]);
  }

  /**
   * Updates the a course21 of the user.
   * @param userId UserID requesting the update.
   * @param courseId The id of course21 to update.
   * @param updateCourseDto The data to update.
   * @returns An HTTP response with the new value as a result.
   */
  async update(
    userId: string,
    courseId: string,
    updateCourseDto: Course21Dto,
  ): Promise<ResponseStatus> {
    const modules = (await this.moduleService.findAll(userId)).result;
    const newCourse = this.matchCourseWithModules(updateCourseDto, modules);
    if (newCourse == null) {
      createResponseStatus(
        HttpStatus.BAD_REQUEST,
        'Not a valid module id was found for one of the courses',
      );
    }
    return db.update<Course21Entity, Course21Dto>(
      userId,
      courseId,
      newCourse,
      this.coursesRepository,
      { where: { id: courseId }, relations: ['modules'] },
    );
  }

  /**
   * Remove a single course21 from the DB.
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
   * Finds and matches the modules information of a course21 dto.
   * Returns empty modules object if there aren't any.
   * Returns null object if a module is not found.
   * @param course The course to find the modules.
   * @param modules The entities of the modules to be added.
   * @returns A new course object with the modules.
   */
  matchCourseWithModules(course: Course21Dto, modules: ModuleEntity) {
    const newCourse = {
      ...course,
    };
    // Rewrite or add the modules attribute to empty to populate it with the correct module format.
    newCourse.modules = [];
    if (course.modules) {
      for (const y in course.modules) {
        let found = false;
        // Check if the module id is present of the modules of the user.
        for (const x in modules) {
          if (modules[x].id == course.modules[y]) {
            newCourse.modules.push(modules[x]);
            found = true;
            break;
          }
        }
        // If the module is not found, means that a not existing or unathorized module is trying to be assigned.
        if (!found) {
          return null;
        }
      }
    }
    return newCourse;
  }

  /**
   * Gets all the TEC21 assigned data of the current period.
   * @param uuid The UUID of the user.
   * @param periodId The UUID of the period.
   * @returns All the courses with the groups that have been assigned for this period.
   */
  async getTec21PeriodData(
    uuid: string,
    periodId: string,
  ): Promise<Course21Entity[]> {
    return await this.coursesRepository
      .createQueryBuilder('course')
      .innerJoin('course.user', 'user')
      .innerJoinAndSelect('course.bloqueGroups', 'bloqueGroups')
      .innerJoin('bloqueGroups.period', 'period21')
      .innerJoinAndSelect('bloqueGroups.bloqueModules', 'bloqueModules')
      .innerJoinAndSelect('bloqueModules.classroom', 'classroom')
      .innerJoinAndSelect('bloqueModules.professors', 'professors')
      .innerJoinAndSelect('bloqueModules.module', 'module')
      .innerJoinAndSelect('bloqueModules.events', 'events')
      .innerJoinAndSelect('professors.professor', 'professor')
      .where('(user.id = :userId::uuid) AND (period21.id = :periodId::uuid)', {
        userId: uuid,
        periodId: periodId,
      })
      .orderBy('course', 'ASC')
      .addOrderBy('bloqueGroups.number', 'ASC')
      .addOrderBy('events.weekDay', 'ASC')
      .getMany();
  }
}
