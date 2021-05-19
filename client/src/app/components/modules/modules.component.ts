import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Module } from 'src/app/models/module.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ComposeModuleComponent } from '../compose-module/compose-module.component';

@Component({
  selector: 'siat-module',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  public modules: Array<Module>;
  public columnsToDisplay = [
    {display : 'Nombre', prop: 'name'}
  ];
  public loading: boolean;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.get('/modules').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.modules = response.result;
        } else {
          this.nzMessageService.error('Error al cargar los modulos');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar modulos');
        console.log('Error al cargar modulos', error);
      }
    );
  }

  public createModule(){
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Modulo',
      nzContent: ComposeModuleComponent,
      nzStyle: {width: '80vw'},
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.module){
          this.modules = [
            ...result.module,
            ...this.modules
          ];
        }
      }
    );
  }

  public afterCsvSuccess(data){
    this.modules = [...data, ...this.modules];
  }

  public onEdit(data){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Modulo',
      nzContent: ComposeModuleComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {module: data, isEditing: true}
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.module){
          const index = this.modules.findIndex(module => module.id === result.module.id);
          Object.assign(this.modules[index], result.module);
        }
      }
    );
  }

  public onDelete(id){
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Modulo',
      nzContent: '<span style="color: red;">Seguro que deseas borrar este modulo?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteModule(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  private deleteModule(id){
    this.loading = true;
    this.apiService.delete(`/modules/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.modules = this.modules.filter(mod => mod.id !== id);
          this.nzMessageService.success('Modulo borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el modulo');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar el modulo', error);
        this.nzMessageService.error('Ocurrió un error al borrar el modulo');
      }
    );
  }

}
