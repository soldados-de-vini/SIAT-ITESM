import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Group20 } from 'src/app/models/group20.model';
import { Professor } from 'src/app/models/professor.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-group-assignment',
  templateUrl: './group-assignment.component.html',
  styleUrls: ['./group-assignment.component.scss'],
})
export class GroupAssignmentComponent implements OnInit {
  @Input() group: Group20 | any;
  @Input() periodId: string;
  @Input() classroomId: string;
  @Input() isModule: boolean;

  public weekDays = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  public events: Array<any> = [null, null, null, null, null, null];
  public professors: Array<Professor> = [];
  public professorsResponsability: Array<number> = [];
  public selectProfessors: Array<Professor>;
  public isLoadingProfessors: boolean;
  public loading: boolean;
  public isSharedTime: boolean;
  public sharedTime = {
    startTime: null,
    endTime: null,
  };

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}

  ngOnInit(): void {}

  disabledHours(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 22, 23];
  }

  defaultDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0);
  }

  public getProfessors() {
    this.isLoadingProfessors = true;
    this.professors = [];

    let body = null;

    if (this.isModule) {
      body = {
        periodId: this.periodId,
        bloqueGroupId: this.group.group.id,
        events: this.parseEvents(),
      };
    } else {
      body = {
        periodId: this.periodId,
        groupId: this.group.id,
        events: this.parseEvents(),
      };
    }

    this.apiService.post('/professors/remaining', body).subscribe(
      (response) => {
        this.isLoadingProfessors = false;
        if (response.status?.statusCode === 200) {
          this.selectProfessors = response.result;
        } else {
          this.nzMessageService.error('Error al cargar maestros');
        }
      },
      (error) => {
        this.isLoadingProfessors = false;
        this.nzMessageService.error('Error al cargar maestros');
        console.log('Error al cargar maestros', error);
      }
    );
  }

  toggleEvent(toggle: boolean, weekday: number) {
    if (toggle) {
      this.events[weekday] = {
        startTime: null,
        endTime: null,
      };
    } else {
      this.events[weekday] = null;
    }
  }

  public areAllEventsFilled() {
    let noNull = false;
    for (const event of this.events) {
      if (event) {
        noNull = true;
        if (event.endTime !== null && event.startTime !== null) {
          continue;
        } else {
          return false;
        }
      } else {
        continue;
      }
    }
    if (noNull) {
      return true;
    } else {
      return false;
    }
  }

  public areAllProfessorsFilled() {
    if (this.professors.length < 1) {
      return false;
    }
    for (const professor of this.professors) {
      if (professor) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  public areAllResponsabilitiesFilled() {
    if (this.professorsResponsability.length < 1) {
      return false;
    }
    for (const res of this.professorsResponsability) {
      if (res) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  public isSharedTimeFilled(){
    return this.isSharedTime && this.sharedTime.startTime && this.sharedTime.endTime;
  }

  public validForm() {
    return (
      (this.areAllEventsFilled() || this.isSharedTimeFilled()) &&
      this.areAllProfessorsFilled() &&
      this.areAllResponsabilitiesFilled()
    );
  }

  public addProfessor() {
    this.professors.push(null);
    this.professorsResponsability.push(null);
  }

  public deleteProfessor() {
    this.professorsResponsability.pop();
    this.professors.pop();
  }

  public cancel() {
    this.nzModalRef.close();
  }

  public assignGroup() {
    const objectToSend = {
      classroomId: this.classroomId,
      professorsIds: this.professors,
      professorsResponsability: this.professorsResponsability,
      events: this.parseEvents(),
    };

    this.loading = true;
    if (this.isModule) {
      this.assignModuleGroup(objectToSend);
    } else {
      this.assignTec20Group(objectToSend);
    }
  }

  private assignTec20Group(objectToSend) {
    this.apiService
      .patch(`/groups/${this.group.id}/event`, objectToSend)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.status?.statusCode === 201) {
            this.nzMessageService.success('Grupo asignado con éxito');
            this.nzModalRef.close({ events: response.result });
          } else if (response.status?.statusCode === 400) {
            this.nzMessageService.error(response.status.message);
          } else {
            this.nzMessageService.error('Error al asignar grupo');
          }
        },
        (error) => {
          this.loading = false;
          this.nzMessageService.error('Error al asignar grupo');
          console.log('Error al asignar grupo', error);
        }
      );
  }

  private assignModuleGroup(objectToSend) {
    this.apiService
      .patch(`/module-groups/${this.group.id}/event`, objectToSend)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.status?.statusCode === 201) {
            this.nzMessageService.success('Grupo asignado con éxito');
            this.nzModalRef.close({
              events: response.result,
              isModule: this.isModule,
            });
          } else if (response.status?.statusCode === 400) {
            this.nzMessageService.error(response.status.message);
          } else {
            this.nzMessageService.error('Error al asignar grupo');
          }
        },
        (error) => {
          this.loading = false;
          this.nzMessageService.error('Error al asignar grupo');
          console.log('Error al asignar grupo', error);
        }
      );
  }

  public parseEvents() {
    const events = [];
    for (const [i, event] of this.events.entries()) {
      if (this.events[i] !== null) {
        if (this.isSharedTime) {
          events.push({
            startTime:
              this.sharedTime.startTime?.getHours() +
              ':' +
              (this.sharedTime.startTime?.getMinutes() === 0
                ? '00'
                : this.sharedTime.startTime?.getMinutes()),
            endTime:
              this.sharedTime.endTime?.getHours() +
              ':' +
              (this.sharedTime.endTime?.getMinutes() === 0
                ? '00'
                : this.sharedTime.endTime?.getMinutes()),
            weekDay: i,
          });
        } else {
          events.push({
            startTime:
              event.startTime?.getHours() +
              ':' +
              (event.startTime?.getMinutes() === 0
                ? '00'
                : event.startTime?.getMinutes()),
            endTime:
              event.endTime?.getHours() +
              ':' +
              (event.endTime?.getMinutes() === 0
                ? '00'
                : event.endTime?.getMinutes()),
            weekDay: i,
          });
        }
      }
    }
    return events;
  }
}
