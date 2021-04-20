import { ProfessorDto } from '../../professors/dto/professor.dto';

const nomina = 'L0000000';
const name = 'Professor Test';
const area = ['Area'];
const coordination = 'Coordination';
const email = 'professor@test.com';
const loadLimit = 10;

const mockProfessorDto = new ProfessorDto();
mockProfessorDto.nomina = nomina;
mockProfessorDto.name = name;
mockProfessorDto.area = area;
mockProfessorDto.coordination = coordination;
mockProfessorDto.email = email;
mockProfessorDto.loadLimit = loadLimit;

export { mockProfessorDto };
