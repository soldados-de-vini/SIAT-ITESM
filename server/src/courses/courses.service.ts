import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { CourseEntity } from './entity/course.entity';
import { CreateCourseReq } from './interfaces/create-course-req.interface';
import * as db from '../utils/db/crud-entity';
import { UpdateCourseModulesDto } from './dto/course-module.dto';
import { ModuleEntity } from '../module/entity/module.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  /**
   * Creates a new course assigned to the user in the database.
   * @param data The message from the user that represents the Courses to be created.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new courses created.
   */
  async create(data: CreateCourseReq, uuid: string): Promise<ResponseStatus> {
    return db.createWithRelation<CourseEntity, CourseDto>(
      this.userRepository,
      this.coursesRepository,
      uuid,
      ['courses'],
      data.courses,
      'courses',
    );
  }

  /**
   * Finds all the courses where typeUF is 'TEC20'.
   * @param uuid The id of the user doing the request.
   * @returns The TEC 20 courses.
   */
  async findTec20(uuid: string): Promise<ResponseStatus> {
    return db.findWithCondition<CourseEntity>(
      uuid,
      this.coursesRepository,
      'course',
      "course.typeUF = 'TEC20'",
    );
  }

  /**
   * Finds all the courses where typeUF is 'B' or 'M'.
   * @param uuid The id of the user doing the request.
   * @returns The courses that are modules or bloques.
   */
  async findTec21(uuid: string): Promise<ResponseStatus> {
    return db.findWithCondition<CourseEntity>(
      uuid,
      this.coursesRepository,
      'course',
      "course.typeUF != 'TEC20'",
      'course.modules',
    );
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
    updateCourseDto: CourseDto,
  ): Promise<ResponseStatus> {
    return db.update<CourseEntity, CourseDto>(
      userId,
      courseId,
      updateCourseDto,
      this.coursesRepository,
      { where: { id: courseId }, relations: ['modules'] },
    );
  }

  /**
   * Update the modules assigned to the course.
   * If the given moduleId does not belong to the user, it will be ignored.
   * @param userId The id of the user.
   * @param courseId The id of the course.
   * @param updateCourseModulesDto The modules to be added on the course.
   * @returns A response containing the new result object.
   */
  async updateModules(
    userId: string,
    courseId: string,
    updateCourseModulesDto: UpdateCourseModulesDto,
  ): Promise<ResponseStatus> {
    const modules = await this.moduleRepository
      .createQueryBuilder('module')
      .where(
        'module.id = ANY(ARRAY[:...ids::uuid]) AND module.userId = :userId',
        {
          ids: updateCourseModulesDto.modules,
          userId: userId,
        },
      )
      .getMany();
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
    });
    course.modules = modules;
    await this.coursesRepository.save(course);
    return db.createResponseStatus(
      HttpStatus.OK,
      'Modules successfully added.',
      course,
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
   * Finds the user information with the courses that are linked to it in the DB.
   * @param uuid The id of the user.
   * @returns The user information with the field of courses populated.
   */
  async getUserCourses(uuid: string): Promise<UsersEntity> {
    return await this.userRepository.findOne({
      where: { id: uuid },
      relations: ['courses'],
    });
  }

  /**
   * Gets the user ID assigned to a course ID.
   * @param courseId The ID of the course to be fetched.
   * @returns The user ID assigned to that course.
   */
  async getCourseUserId(courseId: string): Promise<string> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['user'],
    });
    if (course) {
      return course.user.id;
    }
    return null;
  }
}
