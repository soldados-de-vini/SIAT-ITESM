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

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.apiService.get('/professors').subscribe(
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

  public validForm() {
    return (
      this.areAllEventsFilled() &&
      this.areAllProfessorsFilled() &&
      this.areAllResponsabilitiesFilled()
    );
  }

  public addProfessor() {
    this.professors.push(null);
    this.professorsResponsability.push(null);
  }

  public deleteProfessor() {
    this.professors.pop();
    this.professorsResponsability.pop();
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

    console.log(objectToSend);

    this.loading = true;
    this.apiService.patch(`/groups/${this.group.id}/event`, objectToSend).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201) {
          this.nzMessageService.success('Grupo asignado con éxito');
          this.nzModalRef.close({events: response.result});
        } else {
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
        events.push({
          startTime: event.startTime.getHours() + ':' + (event.startTime.getMinutes() === 0 ? '00' : event.startTime.getMinutes()),
          endTime: event.endTime.getHours() + ':' + (event.endTime.getMinutes() === 0 ? '00' : event.endTime.getMinutes()),
          weekDay: i,
        });
      }
    }
    return events;
  }
}
