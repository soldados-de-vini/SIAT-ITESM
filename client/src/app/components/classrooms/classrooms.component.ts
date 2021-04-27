import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/app/models/classroom.model';
import { ApiService } from 'src/app/services/api/api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComposeClassroomComponent } from '../compose-classroom/compose-classroom.component';

@Component({
  selector: 'siat-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  columnsToDisplay = [
    'Salón', 'Edificio', 'Capacidad', 'Comentarios', 'Tipo',
    'Escuela', 'Entrada', 'Division actual', 'Administrador', 'Estatus'
  ];
  classrooms: Array<Classroom>;

  constructor(
    private api: ApiService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.getClassrooms();
  }

  getClassrooms(): void {
    this.api.get('/classrooms').subscribe((res) => {
      console.log(res);
      this.classrooms = res.result;
    });
  }

  createClassroom(): void {
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar materia',
      nzContent: ComposeClassroomComponent,
      nzStyle: {width: '80vw'}
    });

    modal.afterClose.subscribe(
      (result) => {
        console.log(result);
        if (result?.classroom){
          this.classrooms = [
            ...this.classrooms,
            ...result.classroom
          ];
        }
      }
    );
  }

  editClassroom(event){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar materia',
      nzContent: ComposeClassroomComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {classroom: event, isEditing: true}
    });

    modal.afterClose.subscribe((res) => {
      const index = this.classrooms.findIndex(item => item.id === res.classroom.id);
      Object.assign(this.classrooms[index], res.classroom);
    });
  }

  onDelete(event){
    //
  }

}
