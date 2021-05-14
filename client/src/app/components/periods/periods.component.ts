import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Period } from 'src/app/models/period.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ComposePeriodComponent } from '../compose-period/compose-period.component';

@Component({
  selector: 'siat-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsComponent implements OnInit {

  public columnsToDisplay = [ 'Nombre', 'Fecha de Inicio', 'Fecha de Fin', 'Vacaciones', 'Intensivo'];
  public loading: boolean;
  public periods: Array<Period>;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.get('/periods').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.periods = response.result;
        } else {
          this.nzMessageService.error('Error al cargar periodos');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar periodos');
        console.log('Error al cargar periodos', error);
      }
    );
  }

  public createPeriod(){
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Periodo',
      nzContent: ComposePeriodComponent,
      nzStyle: {width: '80vw'},
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.periods){
          this.periods = [
            ...result.periods,
            ...this.periods
          ];
        }
      }
    );
  }

  public onDelete(id){
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Periodo',
      nzContent: '<span style="color: red;">Seguro que deseas borrar este periodo?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deletePeriod(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  private deletePeriod(id){
    this.loading = true;
    this.apiService.delete(`/periods/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.periods = this.periods.filter(period => period.id !== id);
          this.nzMessageService.success('Periodod borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el periodo');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar el periodo', error);
        this.nzMessageService.error('Ocurrió un error al borrar el periodo');
      }
    );
  }

  public onEdit(data){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Periodo',
      nzContent: ComposePeriodComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {period: data, isEditing: true}
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.period){
          const index = this.periods.findIndex(period => period.id === result.period.id);
          Object.assign(this.periods[index], result.period);
        }
      }
    );
  }

  public openPeriod(data){
    this.router.navigate(['/dashboard/periodo', data.id]);
  }
}
