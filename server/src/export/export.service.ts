import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportToCsv } from 'export-to-csv';
import { CourseEntity } from '../courses20/entity/course20.entity';
import { Course21Entity } from '../courses21/entities/course21.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @InjectRepository(Course21Entity)
    private courses21Repository: Repository<Course21Entity>,
  ) {}

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
    return await this.courses21Repository
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

  /**
   * Creates a CSV file of the TEC 20 groups of the period of the user.
   * @param uuid The ID of the user.
   * @param periodId The UUID of the period.
   * @returns The CSV file.
   */
  async createTec20Csv(uuid: string, periodId: string) {
    const periodData = await this.getTec20PeriodData(uuid, periodId);
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
    const periodData = await this.getTec21PeriodData(uuid, periodId);
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
