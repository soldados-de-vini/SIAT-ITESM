import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Professor } from 'src/app/models/professor.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ComposeProfessorComponent } from '../compose-professor/compose-professor.component';


@Component({
  selector: 'siat-maestros',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss']
})
export class ProfessorsComponent implements OnInit {

  public columnsToDisplay = [ 'Nomina', 'Nombre', 'Área', 'Coordinación', 'Email', 'Límite de carga'];
  public professors: Array<Professor>;
  public loading: boolean;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService
  ) {
    this.loading = true;
    this.apiService.get('/professors').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.professors = response.result;
        } else {
          this.nzMessageService.error('Error al cargar maestros');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar maestros');
        console.log('Error al cargar maestros', error);
      }
    );
  }

  ngOnInit(): void {
  }

  public createProfessor(){
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Maestro',
      nzContent: ComposeProfessorComponent,
      nzStyle: {width: '80vw'},
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.professors){
          this.professors = [
            ...result.professors,
            ...this.professors
          ];
        }
      }
    );
  }

  public afterCsvSuccess(data){
    this.professors = [...data, ...this.professors];
  }

  public onDelete(id){
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Maestro',
      nzContent: '<span style="color: red;">Seguro que deseas borrar este maestro?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteProfessor(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  private deleteProfessor(id){
    this.loading = true;
    this.apiService.delete(`/professors/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.professors = this.professors.filter(professor => professor.id !== id);
          this.nzMessageService.success('Maestro borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el maestro');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar el maestro', error);
        this.nzMessageService.error('Ocurrió un error al borrar el maestro');
      }
    );
  }

  public onEdit(data){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Maestro',
      nzContent: ComposeProfessorComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {professor: data, isEditing: true}
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.professor){
          const index = this.professors.findIndex(professor => professor.id === result.professor.id);
          Object.assign(this.professors[index], result.professor);
        }
      }
    );
  }
}
