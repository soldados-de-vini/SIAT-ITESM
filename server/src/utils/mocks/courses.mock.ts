import { CourseEntity } from '../../courses/entity/course.entity';
import { CourseDto } from '../../courses/dto/course.dto';

const key = 'key';
const name = 'name';
const capacity = 10;
const semester = '5';
const initialWeek = 0;
const weeks = 5;
const avenue = ['ITI'];
const typeUF = 'B';

const mockCourseDto = new CourseDto();
mockCourseDto.key = key;
mockCourseDto.name = name;
mockCourseDto.capacity = capacity;
mockCourseDto.initialWeek = initialWeek;
mockCourseDto.weeks = weeks;
mockCourseDto.semester = semester;
mockCourseDto.avenue = avenue;
mockCourseDto.typeUF = typeUF;

let mockCourseWithEmptyModules = new CourseEntity();
mockCourseWithEmptyModules = Object.assign(
  mockCourseWithEmptyModules,
  mockCourseDto,
);
mockCourseWithEmptyModules.id = 'uuid';
mockCourseWithEmptyModules.modules = [];

export { mockCourseDto, mockCourseWithEmptyModules };
