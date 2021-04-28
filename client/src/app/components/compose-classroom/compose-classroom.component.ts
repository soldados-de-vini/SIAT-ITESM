import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-classroom',
  templateUrl: './compose-classroom.component.html',
  styleUrls: ['./compose-classroom.component.scss']
})
export class ComposeClassroomComponent implements OnInit {

  classroomForm!: FormGroup;
  loading: boolean;
  @Input() classroom;
  @Input() isEditing;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    if (this.classroom){
      this.initializeEditForm();
    }else{
      this.initializeCreateForm();
    }
  }

  handleCancel(){
    this.nzModalRef.destroy();
  }

  handleOk(){
    if (this.isEditing){
      this.editClassroom();
    }else{
      this.addClassroom();
    }
  }

  addClassroom(){
    this.loading = true;
    this.api.post(`/classrooms`, {classrooms: [this.classroomForm.value]}).subscribe((res) => {
      this.loading = false;
      if (res.status?.statusCode === 201){
        this.nzMessageService.success('Salón creado con éxito');
        this.nzModalRef.destroy({classroom: res.result});
      }else {
        this.nzMessageService.error('Ocurrió un error al agregar el salón');
      }
    }, (error) => {
      this.loading = false;
      this.nzMessageService.error('Ocurrió un error al agregar el salón');
    }
    );
  }

  editClassroom(){
    this.loading = true;
    this.api.put(`/classrooms/${this.classroom.id}`, this.classroomForm.value).subscribe((res) => {
      this.loading = false;
      if (res.status?.statusCode === 200){
        this.nzMessageService.success('Salon editado con éxito');
        this.nzModalRef.destroy({classroom: res.result});
      }else {
        this.nzMessageService.error('Ocurrió un error al editar el salón');
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
      this.nzMessageService.error('Ocurrió un error al editar el salón');
    }
    );
  }

  initializeCreateForm(){
    this.classroomForm = this.fb.group({
      administrator: [null, [Validators.required]],
      building: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
      classroom: [null, [Validators.required]],
      comments: [null, [Validators.required]],
      currentDiv: [null, [Validators.required]],
      entrance: [null, [Validators.required]],
      school: [null, [Validators.required]],
      status: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  initializeEditForm(){
    this.classroomForm = this.fb.group({
      administrator: [this.classroom.administrator, [Validators.required]],
      building: [this.classroom.building, [Validators.required]],
      capacity: [this.classroom.capacity, [Validators.required]],
      classroom: [this.classroom.classroom, [Validators.required]],
      comments: [this.classroom.comments, [Validators.required]],
      currentDiv: [this.classroom.currentDiv, [Validators.required]],
      entrance: [this.classroom.entrance, [Validators.required]],
      school: [this.classroom.school, [Validators.required]],
      status: [this.classroom.status, [Validators.required]],
      type: [this.classroom.type, [Validators.required]],
    });
  }

}
