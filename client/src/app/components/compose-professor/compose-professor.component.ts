import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Professor } from 'src/app/models/professor.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-professor',
  templateUrl: './compose-professor.component.html',
  styleUrls: ['./compose-professor.component.scss']
})
export class ComposeProfessorComponent implements OnInit {

  @Input() professor: Professor;
  @Input() isEditing: boolean;
  public loading: boolean;
  public professorForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.professor) {
      this.createFormWithProfessor();
    } else {
      this.createForm();
    }
  }

  private createForm(){
    this.professorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      nomina: ['', [Validators.required]],
      coordination: [''],
      area: [[]],
      email: ['', [Validators.required]],
      loadLimit: [null, [Validators.required]]
    });
  }

  private createFormWithProfessor(){
    this.professorForm = this.formBuilder.group({
      name: [this.professor.name, [Validators.required]],
      nomina: [this.professor.nomina, [Validators.required]],
      coordination: [this.professor.coordination],
      area: [this.professor.area],
      email: [this.professor.email, [Validators.required]],
      loadLimit: [this.professor.loadLimit, [Validators.required]]
    });
    this.professorForm.controls.nomina.disable();
  }

  public cancel(){
    this.nzModalRef.destroy();
  }

  public saveProfessor(){
    if (this.isEditing){
      this.editProfessor();
    } else {
      this.createProfessor();
    }
  }

  private createProfessor(){
    this.loading = true;
    this.apiService.post('/professors', {professors: [this.professorForm.value]}).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201){
          this.nzMessageService.success('Maestro creado con éxito');
          this.nzModalRef.destroy({professors: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al crear el maestro');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al crear el maestro');
      }
    );
  }

  private editProfessor(){
    this.loading = true;
    this.apiService.put(`/professors/${this.professor.id}`, this.professorForm.value).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.nzMessageService.success('Maestro editado con éxito');
          this.nzModalRef.destroy({professor: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el maestro');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el maestro');
      }
    );
  }
}
