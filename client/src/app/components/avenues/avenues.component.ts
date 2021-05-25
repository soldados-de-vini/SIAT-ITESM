import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Avenue } from 'src/app/models/avenue.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ComposeAvenueComponent } from '../compose-avenue/compose-avenue.component';

@Component({
  selector: 'siat-avenues',
  templateUrl: './avenues.component.html',
  styleUrls: ['./avenues.component.scss']
})
export class AvenuesComponent implements OnInit {

  public avenues: Array<Avenue>;
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
    this.apiService.get('/avenues').subscribe((response) => {
      this.loading = false;
      if (response.status?.statusCode === 200){
          this.avenues = response.result;
      } else {
        this.nzMessageService.error('Error al cargar avenidas');
      }
    },
    (error) => {
      this.loading = false;
      this.nzMessageService.error('Error al cargar avenidas');
      console.log('Error al cargar avenidas', error);
    }
    );
  }

  public createAvenue(){
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Avenida',
      nzContent: ComposeAvenueComponent,
      nzStyle: {width: '80vw'},
    });

    modal.afterClose.subscribe(
      (result) => {
        console.log(result);
        if (result?.avenue){
          this.avenues = [
            ...result.avenue,
            ...this.avenues
          ];
        }
      }
    );
  }

  public afterCsvSuccess(data){
    this.avenues = [...data, ...this.avenues];
  }

  public onEdit(data){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Avenida',
      nzContent: ComposeAvenueComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {avenue: data, isEditing: true}
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.avenue){
          const index = this.avenues.findIndex(avenue => avenue.id === result.avenue.id);
          Object.assign(this.avenues[index], result.avenue);
        }
      }
    );
  }

  public onDelete(id){
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Avenida',
      nzContent: '<span style="color: red;">Seguro que deseas borrar esta avenida?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteAvenue(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  private deleteAvenue(id){
    this.loading = true;
    this.apiService.delete(`/avenues/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.avenues = this.avenues.filter(av => av.id !== id);
          this.nzMessageService.success('Avenida borrada con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar la avenida');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar la avenida', error);
        this.nzMessageService.error('Ocurrió un error al borrar la avenida');
      }
    );
  }

}
