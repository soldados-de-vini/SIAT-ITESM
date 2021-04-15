import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { CourseEntity } from './entity/course.entity';
import { CreateCourseReq } from './interfaces/create-course-req.interface';

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
    // Get the user that will have the courses added.
    const user = await this.userRepository.findOne({
      where: { id: uuid },
      relations: ['courses'],
    });
    const resultCourses = [];
    for (let i = 0; i < data.courses.length; i++) {
      // Create new course object with the provided information.
      const newCourse = this.coursesRepository.create(data.courses[i]);
      resultCourses.push(newCourse);
      await this.coursesRepository.save(newCourse);
      // Assign the new course to the user that created it.
      user.courses.push(newCourse);
    }
    // Save the relationship on the database.
    await this.userRepository.save(user);
    return {
      status: {
        statusCode: HttpStatus.CREATED,
        message: 'Courses successfully created.',
      },
      result: resultCourses,
    };
  }

  /**
   * Queries all the courses of the user and sends them back.
   * @param uuid The user's id.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    const user = await this.getUserCourses(uuid);
    return {
      status: {
        statusCode: HttpStatus.OK,
        message: 'Searched user courses successfully.',
      },
      result: user.courses,
    };
  }

  /**
   * Updates the a course of the user.
   * @param userId UserID requesting the update.
   * @param courseId The id of course to update.
   * @param updateCourseDto The data to update.
   * @returns An HTTP response with the new value as a result.
   */
  async update(userId: string, courseId: string, updateCourseDto: CourseDto) {
    const toUpdate = await this.coursesRepository.findOne({
      where: { id: courseId },
    });
    const idRetrieved = await this.getCourseUserId(courseId);
    if (toUpdate) {
      if (idRetrieved == userId) {
        const updated = Object.assign(toUpdate, updateCourseDto);
        const newValue = await this.coursesRepository.save(updated);
        return {
          status: {
            statusCode: HttpStatus.OK,
            message: 'Course updated successfully.',
          },
          result: newValue,
        };
      }
      return {
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unathorized update.',
        },
      };
    }
    return {
      status: {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Course to update has not been found.',
      },
    };
  }

  /**
   * Remove a single course from the DB.
   * @param userId The ID of the user who made the request.
   * @param courseId The ID of the course to be deleted.
   * @returns A response stating success or failure.
   */
  async remove(userId: string, courseId: string): Promise<ResponseStatus> {
    const idRetrieved = await this.getCourseUserId(courseId);
    // Verify that the course exists.
    if (idRetrieved) {
      // Check if the requested deletion belongs to the user.
      if (idRetrieved == userId) {
        await this.coursesRepository.delete({ id: courseId });
        return {
          status: {
            statusCode: HttpStatus.OK,
            message: 'Successfully deleted.',
          },
        };
      }
      return {
        status: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unathorized deletion.',
        },
      };
    }
    return {
      status: {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Course to delete has not been found.',
      },
    };
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
