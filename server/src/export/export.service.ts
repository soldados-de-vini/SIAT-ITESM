import { Injectable } from '@nestjs/common';
import { ExportToCsv } from 'export-to-csv';
import { CoursesService } from '../courses20/courses.service';
import { Courses21Service } from '../courses21/courses21.service';
import { ProfessorsService } from '../professors/professors.service';
import * as udc from '../utils/udc.utils';

@Injectable()
export class ExportService {
  constructor(
    private readonly courses20Service: CoursesService,
    private readonly courses21Service: Courses21Service,
    private readonly professorsService: ProfessorsService,
  ) {}

  /**
   * Creates a CSV file of the TEC 20 groups of the period of the user.
   * @param uuid The ID of the user.
   * @param periodId The UUID of the period.
   * @returns The CSV file.
   */
  async createTec20Csv(uuid: string, periodId: string) {
    const periodData = await this.courses20Service.getTec20PeriodData(
      uuid,
      periodId,
    );
    const data = [];
    for (const course of periodData) {
      const courseData = {
        Clave: course.key,
        Nombre: course.name,
        Capacidad: course.capacity,
        Semestre: course.semester,
        SemanaInicial: course.initialWeek,
        Duracion: `${course.weeks} semanas`,
        TipoUF: course.typeUF,
        Avenidas: course.avenue.join(' '),
      };
      for (const group of course.groups) {
        const groupData = {
          ...courseData,
          Grupo: group.number,
          Formato: group.formato ? group.formato : '',
          Matriculas: group.matricula ? group.formato : '',
          Salon: group.classroom.classroom,
          Edificio: group.classroom.building,
        };
        const professorData = {};
        let counter = 1;
        for (const professor of group.professors) {
          professorData[`Nomina ${counter}`] = professor.professor.nomina;
          professorData[`Nombre ${counter}`] = professor.professor.name;
          professorData[`Porcentaje De Responsabilidad ${counter}`] =
            professor.responsabilityPercent;
          professorData[`Area ${counter}`] = professor.professor.area;
          professorData[`Coordination ${counter}`] =
            professor.professor.coordination;
          professorData[`Email ${counter}`] = professor.professor.email;
          counter++;
        }
        // Fill the rest of the data.
        if (counter <= 5) {
          for (let i = counter; i <= 5; i++) {
            professorData[`Nomina ${counter}`] = '';
            professorData[`Nombre ${counter}`] = '';
            professorData[`Porcentaje De Responsabilidad ${counter}`] = '';
            professorData[`Area ${counter}`] = '';
            professorData[`Coordination ${counter}`] = '';
            professorData[`Email ${counter}`] = '';
            counter++;
          }
        }
        for (const event of group.events) {
          const eventData = {
            Dia: this._weekDayToString(event.weekDay),
            Inicio: event.startTimeString,
            Fin: event.endTimeString,
          };
          data.push({
            ...groupData,
            ...eventData,
            ...professorData,
          });
        }
      }
    }
    return this._createCsvFile(data);
  }

  /**
   * Creates a CSV file with the TEC 21 group information of a period.
   * @param uuid The UUID of the user.
   * @param periodId The period to export data from.
   * @returns A CSV file.
   */
  async createTec21Csv(uuid: string, periodId: string) {
    const periodData = await this.courses21Service.getTec21PeriodData(
      uuid,
      periodId,
    );
    const data = [];
    for (const course of periodData) {
      const courseData = {
        Clave: course.key,
        Nombre: course.name,
        Capacidad: course.capacity,
        Semestre: course.semester,
        SemanaInicial: course.initialWeek,
        Duracion: `${course.weeks} semanas`,
        TipoUF: course.typeUF,
        Avenidas: course.avenue.join(' '),
      };
      for (const group of course.bloqueGroups) {
        const groupData = {
          ...courseData,
          Grupo: group.number,
          Formato: group.formato ? group.formato : '',
          Matriculas: group.matricula ? group.formato : '',
        };
        for (const moduleGroup of group.bloqueModules) {
          const moduleData = {
            ...groupData,
            Salon: moduleGroup.classroom.classroom,
            Edificio: moduleGroup.classroom.building,
            Modulo: moduleGroup.module.name,
          };
          const professorData = {};
          let counter = 1;
          for (const professor of moduleGroup.professors) {
            professorData[`Nomina ${counter}`] = professor.professor.nomina;
            professorData[`Nombre ${counter}`] = professor.professor.name;
            professorData[`Porcentaje De Responsabilidad ${counter}`] =
              professor.responsabilityPercent;
            professorData[`Area ${counter}`] = professor.professor.area;
            professorData[`Coordination ${counter}`] =
              professor.professor.coordination;
            professorData[`Email ${counter}`] = professor.professor.email;
            counter++;
          }
          // Fill the rest of the data.
          if (counter <= 5) {
            for (let i = counter; i <= 5; i++) {
              professorData[`Nomina ${counter}`] = '';
              professorData[`Nombre ${counter}`] = '';
              professorData[`Porcentaje De Responsabilidad ${counter}`] = '';
              professorData[`Area ${counter}`] = '';
              professorData[`Coordination ${counter}`] = '';
              professorData[`Email ${counter}`] = '';
              counter++;
            }
          }
          for (const event of moduleGroup.events) {
            const eventData = {
              Dia: this._weekDayToString(event.weekDay),
              Inicio: event.startTimeString,
              Fin: event.endTimeString,
            };
            data.push({
              ...moduleData,
              ...eventData,
              ...professorData,
            });
          }
        }
      }
    }
    return this._createCsvFile(data);
  }

  async createProfessorsCsv(uuid: string, periodId: string) {
    const tec20Data = await this.professorsService.getProfessorPeriodDataTec20(
      uuid,
      periodId,
    );
    const tec21Data = await this.professorsService.getProfessorPeriodDataTec21(
      uuid,
      periodId,
    );
    const professorsData = {};
    for (const professor of tec20Data) {
      const hours = udc.calculateTotalHours(
        professor.sumTec20.hours,
        professor.sumTec20.minutes,
      );
      const weeks = professor.sumWeeks20;
      delete professor.sumTec20;
      delete professor.sumWeeks20;
      professorsData[professor.nomina] = this._createProfessorData(
        professor,
        udc.convertHoursToUdc(hours * weeks),
      );
    }
    for (const professor of tec21Data) {
      // Since the professor can be repeated in these data, we need
      // to check to add the hours of courses that belong to TEC 21.
      const professorData = professorsData[professor.nomina];
      const hours = udc.calculateTotalHours(
        professor.sumTec21.hours,
        professor.sumTec21.minutes,
      );
      if (professorData) {
        professorData.udc += udc.convertHoursToUdc(
          hours * professor.sumWeeks21,
        );
      } else {
        const weeks = professor.sumWeeks21;
        delete professor.sumTec21;
        delete professor.sumWeeks21;
        professorsData[professor.nomina] = this._createProfessorData(
          professor,
          udc.convertHoursToUdc(hours * weeks),
        );
      }
    }
    var keys = Object.keys(professorsData);
    const values = keys.map(function(v) { return professorsData[v]; });
    return this._createCsvFile(values);
  }

  _createProfessorData(professor: any, udc: number) {
    return {
      nomina: professor.nomina,
      nombre: professor.nombre,
      area: professor.area.join(' '),
      coordinacion: professor.coordinacion,
      email: professor.email,
      limite_carga: professor.limite_carga,
      udc: udc,
    };
  }

  /**
   * Generates a new CSV file.
   * @param data The data of the rows of the CSV.
   * @returns A CSV file from the data.
   */
  _createCsvFile(data: any) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      title: 'tec20CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);

    return csvExporter.generateCsv(data, true);
  }

  /**
   * Transform a number from 0 to 6 into it's week name.
   * @param weekDay The number of the day of the week.
   * @returns The Spanish string equivalent.
   */
  _weekDayToString(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return 'Lunes';
      case 1:
        return 'Martes';
      case 2:
        return 'Miercoles';
      case 3:
        return 'Jueves';
      case 4:
        return 'Viernes';
      case 5:
        return 'Sabado';
      case 6:
        return 'Domingo';
      default:
        return 'Invalid';
    }
  }
}
