import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Course } from 'src/app/models/course.model';
import { Module } from 'src/app/models/module.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-block',
  templateUrl: './compose-block.component.html',
  styleUrls: ['./compose-block.component.scss']
})
export class ComposeBlockComponent implements OnInit {

  @Input() block: Course;
  @Input() isEditing: boolean;
  public isLoadingModules: boolean;
  public modules: Array<Module>;
  public loading: boolean;
  public blockForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getModules();
    if (this.block) {
      this.createFormWithBlock();
    } else {
      this.createForm();
    }
  }

  private getModules(){
    this.isLoadingModules = true;
    this.apiService.get('/modules').subscribe(
      (response) => {
        this.isLoadingModules = false;
        if (response.status?.statusCode === 200){
          this.modules = response.result;
        } else {
          this.nzMessageService.error('Error al cargar los modulos');
        }
      },
      (error) => {
        this.isLoadingModules = false;
        this.nzMessageService.error('Error al cargar modulos');
        console.log('Error al cargar modulos', error);
      }
    );
  }

  private createForm(){
    this.blockForm = this.formBuilder.group({
      key: ['', [Validators.required]],
      name: ['', [Validators.required]],
      capacity: [null, [Validators.required]],
      semester: [null, Validators.required],
      modules: [[], Validators.required],
      avenue: [[], Validators.required],
      initialWeek: [null, Validators.required],
      weeks: [null, Validators.required],
      typeUF: ['B']
    });
  }

  private createFormWithBlock(){
    this.blockForm = this.formBuilder.group({
      key: [this.block.key, [Validators.required]],
      name: [this.block.name, [Validators.required]],
      capacity: [this.block.capacity, [Validators.required]],
      semester: [null, Validators.required],
      modules: [this.block.modules, Validators.required],
      avenue: [this.block.avenue, Validators.required],
      initialWeek: [this.block.initialWeek, Validators.required],
      weeks: [this.block.weeks, Validators.required],
      typeUF: ['B']
    });
  }

  public cancel(){
    this.nzModalRef.destroy();
  }

  public saveBlock(){
    if (this.isEditing){
      this.editBlock();
    } else {
      this.createBlock();
    }
  }

  private createBlock(){
    this.loading = true;
    console.log(this.blockForm.value);
    this.apiService.post('/courses', {courses: [this.blockForm.value]}).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201){
          console.log(response.result);
          this.nzMessageService.success('Bloque creado con éxito');
          this.nzModalRef.destroy({blocks: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al crear el Bloque');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al crear el Bloque');
      }
    );
  }

  private editBlock(){
    this.loading = true;
    this.apiService.put(`/courses/${this.block.id}`, this.blockForm.value).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.nzMessageService.success('Bloque editado con éxito');
          this.nzModalRef.destroy({block: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el Bloque');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el Bloque');
      }
    );
  }
}
