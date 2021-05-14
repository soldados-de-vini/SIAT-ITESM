import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ApiService } from 'src/app/services/api/api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComposeCourseComponent } from '../compose-course/compose-course.component';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'siat-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public loading: boolean;
  public columnsToDisplay = [
    'CLAVE', 'Nombre', 'Capacidad', 'Semestre',
    'Semana inicial', 'Semanas', 'Avenida(s)', 'Tipo'];
  public courses: Array<Course> = [];

  constructor(
    private api: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.api.get('/courses20').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.courses = response.result;
        } else {
          this.nzMessageService.error('Error al cargar los materias');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar materias');
        console.log('Error al cargar bloques', error);
      }
    );
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
          this.courses = [
            ...this.courses,
            ...result.course
          ];
        }
      }
    );
  }

  deleteCourse(event): void {
    const id = event;
    this.api.delete(`/courses20/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.afterDelete(event),
          this.nzMessageService.success('Bloque borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el bloque');
        }
      },
      (error) => {
        this.nzMessageService.error('Ocurrió un error al borrar la materia.');
        console.log(error);
      }
    );
  }

  onDelete(event){
    this.showDeleteConfirmation(event);
  }

  afterDelete(event){
    const id = event;
    this.courses = this.courses.filter(d => d.id !== id);
    this.nzMessageService.success('Materia borrada con éxito');
  }

  editCourse(event){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar materia',
      nzContent: ComposeCourseComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {course: event, isEditing: true}
    });

    modal.afterClose.subscribe((res) => {
      const index = this.courses.findIndex(item => item.id === res.course.id);
      Object.assign(this.courses[index], res.course);
    });
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Materia',
      nzContent: '<span style="color: red;">¿Seguro que deseas borrar esta materia?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteCourse(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  public afterCsvSuccess(data){
    this.courses = [...data, ...this.courses];
  }

}
