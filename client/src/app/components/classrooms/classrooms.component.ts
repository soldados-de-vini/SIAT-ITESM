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
    {display: 'Salon', prop: 'classroom'},
    {display: 'Edificio', prop: 'building'},
    {display: 'Capacity', prop: 'capacity'},
    {display: 'Comentarios', prop: 'comments'},
    {display: 'Tipo', prop: 'type'},
    {display: 'Escuela', prop: 'school'},
    {display: 'Entrada', prop: 'entrance'},
    {display: 'Division Actual', prop: 'actualDivision'},
    {display: 'Administrador', prop: 'administrator'},
    {display: 'Estatus', prop: 'status'}
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
    this.showDeleteConfirmation(event);
  }

  showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Materia',
      nzContent: '<span style="color: red;">¿Seguro que deseas borrar este salón?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteClassroom(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  deleteClassroom(event){
    const id = event;
    this.api.delete(`/classrooms/${id}`).subscribe(
      success => this.afterDelete(event),
      error => console.log(error)
    );
  }

  afterDelete(event){
    const id = event;
    this.classrooms = this.classrooms.filter(d => d.id !== id);
  }

}
