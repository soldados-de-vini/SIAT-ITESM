import { Course20Dto } from '../../courses20/dto/course20.dto';

const key = 'key';
const name = 'name';
const capacity = 10;
const semester = '5';
const initialWeek = 0;
const weeks = 5;
const avenue = ['ITI'];
const typeUF = 'B';

const mockCourseDto = new Course20Dto();
mockCourseDto.key = key;
mockCourseDto.name = name;
mockCourseDto.capacity = capacity;
mockCourseDto.initialWeek = initialWeek;
mockCourseDto.weeks = weeks;
mockCourseDto.semester = semester;
mockCourseDto.avenue = avenue;
mockCourseDto.typeUF = typeUF;

export { mockCourseDto };
