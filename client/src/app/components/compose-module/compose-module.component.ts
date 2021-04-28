import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Module } from 'src/app/models/module.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-module',
  templateUrl: './compose-module.component.html',
  styleUrls: ['./compose-module.component.scss']
})
export class ComposeModuleComponent implements OnInit {

  @Input() module: Module;
  @Input() isEditing: boolean;
  public loading: boolean;
  public moduleForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.module) {
      this.createFormWithModule();
    } else {
      this.createForm();
    }
  }

  private createForm(){
    this.moduleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  private createFormWithModule(){
    this.moduleForm = this.formBuilder.group({
      name: [this.module.name, [Validators.required]],
    });
  }

  public cancel(){
    this.nzModalRef.destroy();
  }

  public saveModule(){
    if (this.isEditing){
      this.editModule();
    } else {
      this.createModule();
    }
  }

  private createModule(){
    this.loading = true;
    this.apiService.post('/modules', {modules: [this.moduleForm.value]}).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201){
          this.nzMessageService.success('Modulo creado con éxito');
          this.nzModalRef.destroy({module: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al crear el modulo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al crear el modulo');
      }
    );
  }

  private editModule(){
    this.loading = true;
    this.apiService.put(`/modules/${this.module.id}`, this.moduleForm.value).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.nzMessageService.success('Modulo editado con éxito');
          this.nzModalRef.destroy({module: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el modulo');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el modulo');
      }
    );
  }
}
