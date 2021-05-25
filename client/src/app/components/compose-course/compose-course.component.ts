import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-course',
  templateUrl: './compose-course.component.html',
  styleUrls: ['./compose-course.component.scss']
})
export class ComposeCourseComponent implements OnInit {

  courseForm!: FormGroup;
  loading: boolean;
  @Input() course;
  @Input() isEditing;
  avenues: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.getAvenues();
    if (this.course){
      this.initializeEditForm();
    }else{
      this.initializeCreateForm();
    }
  }

  public handleCancel(){
    this.nzModalRef.destroy();
  }

  public handleOk(){
    if (this.isEditing){
      this.editCourse();
    }else{
      this.addCourse();
    }
  }

  public addCourse(){
    this.loading = true;
    this.api.post(`/courses20`, {courses: [this.courseForm.value]}).subscribe((res) => {
      this.loading = false;
      if (res.status?.statusCode === 201){
        this.nzMessageService.success('Materia creada con éxito');
        this.nzModalRef.destroy({course: res.result});
      }else {
        this.nzMessageService.error('Ocurrió un error al agregar la materia');
      }
    }, (error) => {
      this.loading = false;
      this.nzMessageService.error('Ocurrió un error al agregar la materia');
    }
    );

  }

  public editCourse(){
    this.loading = true;
    this.api.put(`/courses20/${this.course.id}`, this.courseForm.value).subscribe((res) => {
      this.loading = false;
      if (res.status?.statusCode === 200){
        this.nzMessageService.success('Materia editada con éxito');
        this.nzModalRef.destroy({course: res.result});
      }else {
        this.nzMessageService.error('Ocurrió un error al editar la materia');
      }
    }, (error) => {
      this.loading = false;
      this.nzMessageService.error('Ocurrió un error al editar la materia');
    }
    );
  }

  private initializeCreateForm(){
    this.courseForm = this.fb.group({
      key: [null, [Validators.required]],
      name: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
      semester: [null, [Validators.required]],
      initialWeek: [null, [Validators.required]],
      weeks: [null, [Validators.required]],
      avenue: [],
      typeUF: ['TEC20'],
    });
  }

  private initializeEditForm(){
    this.courseForm = this.fb.group({
      key: [this.course.key, [Validators.required]],
      name: [this.course.name, [Validators.required]],
      capacity: [this.course.capacity, [Validators.required]],
      semester: [this.course.semester, [Validators.required]],
      initialWeek: [this.course.initialWeek, [Validators.required]],
      weeks: [this.course.weeks, [Validators.required]],
      avenue: [this.course.avenue],
      typeUF: [this.course.typeUF],
    });
  }

  public isArray(object: any): boolean{
    return Array.isArray(object);
  }

  public getAvenues(){
    this.api.get('/avenues').subscribe((res) => {
      this.avenues = res.result;
    });
  }

}
