import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia.model';
import { ApiService } from 'src/app/services/api/api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComposeCourseComponent } from '../compose-course/compose-course.component';


@Component({
  selector: 'siat-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  columnsToDisplay = [
    'CLAVE', 'Nombre', 'Capacidad', 'Semestre',
    'Semana inicial', 'Semanas', 'Avenida(s)', 'Tipo', 'Modulos'];
  materias: Array<Materia> = [];

  constructor(
    private api: ApiService,
    private nzModalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.api.get('/courses').subscribe((res) => {
      this.materias = res.result;
    });
  }

  createCourse(): void {
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar materia',
      nzContent: ComposeCourseComponent,
      nzStyle: {width: '80vw'}
    });

    modal.afterClose.subscribe(
      (result) => {
        console.log(result);
        if (result?.course){
          this.materias = [
            ...this.materias,
            ...result.course
          ];
        }
      }
    );
  }

  deleteMateria(event): void {
    const id = event.id;
    this.api.delete(`/courses/${id}`).subscribe(
      success => this.afterDelete(event),
      error => console.log(error)
    );
  }

  onDelete(event){
    this.showDeleteConfirmation(event);
  }

  afterDelete(event){
    const id = event.id;
    this.materias = this.materias.filter(d => d.id !== id);
  }

  editMateria(event){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar materia',
      nzContent: ComposeCourseComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {course: event, isEditing: true}
    });

    modal.afterClose.subscribe((res) => {
      const index = this.materias.findIndex(item => item.id === res.course.id);
      Object.assign(this.materias[index], res.course);
    });
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Materia',
      nzContent: '<span style="color: red;">¿Seguro que deseas borrar esta materia?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteMateria(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

}
