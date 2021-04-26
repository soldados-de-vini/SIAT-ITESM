import { Course21Dto } from '../../courses21/dto/course21.dto';

const key = 'key';
const name = 'name';
const capacity = 10;
const semester = '5';
const initialWeek = 0;
const weeks = 5;
const avenue = ['ITI'];
const typeUF = 'B';

const mockCourse21Dto = new Course21Dto();
mockCourse21Dto.key = key;
mockCourse21Dto.name = name;
mockCourse21Dto.capacity = capacity;
mockCourse21Dto.initialWeek = initialWeek;
mockCourse21Dto.weeks = weeks;
mockCourse21Dto.semester = semester;
mockCourse21Dto.avenue = avenue;
mockCourse21Dto.typeUF = typeUF;
mockCourse21Dto.modules = [];

export { mockCourse21Dto };
