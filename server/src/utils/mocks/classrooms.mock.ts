import { ClassroomDto } from "../../classrooms/dto/classroom.dto";

const classroom = 1;
const building = 'E';
const capacity = 10;
const comments = 'Comment';
const type = 'type';
const school = 'school';
const entrance = 'entrance';
const currentDiv = 'currentDiv';
const administrator = 'administrator';

const mockClassroomsDto = new ClassroomDto();
mockClassroomsDto.classroom = classroom;
mockClassroomsDto.building = building;
mockClassroomsDto.capacity = capacity;
mockClassroomsDto.comments = comments;
mockClassroomsDto.type = type;
mockClassroomsDto.school = school;
mockClassroomsDto.entrance = entrance;
mockClassroomsDto.currenDiv = currentDiv;
mockClassroomsDto.administrator = administrator;

export { mockClassroomsDto };