import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { ComposeGroupComponent } from '../compose-group/compose-group.component';

@Component({
  selector: 'siat-groups21',
  templateUrl: './groups21.component.html',
  styleUrls: ['./groups21.component.scss']
})
export class Groups21Component implements OnInit {

  // tslint:disable-next-line: variable-name
  private _periodId: string;

  @Input() set periodId(value: string) {
    this._periodId = value;
    this.getGroups21();
 }

  public columnsToDisplay = [
    {display: 'Clave', prop: 'courseKey'},
    {display: 'Número de Grupo', prop: 'number'},
    {display: 'Formato', prop: 'formato'},
    {display: 'Matricula', prop: 'matricula'},
  ];
  public groups: any;
  public loading: boolean;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.getGroups21();
  }

  private getGroups21() {
    this.apiService.get(`/groups21/period/${this._periodId}`).subscribe(
      (response) => {
        if (response.status?.statusCode === 200){
          this.groups = response.result;
          console.log('groups', this.groups);
          this.parseGroups();
        } else {
          this.nzMessageService.error('Error al cargar grupos Tec 21');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar grupos Tec 21');
        console.log('Error al cargar grupos Tec 21', error);
      }
    );
  }

  private parseGroups(){
    this.groups = this.groups.map((group) => {
      const newGroup = {courseKey: '', number: '', formato: '', matricula: '', id: ''};
      newGroup.id = group.id;
      newGroup.courseKey = group.courseKey;
      newGroup.number = group.number;
      newGroup.formato = group.formato === null ? '' : group.formato;
      newGroup.matricula = group.matricula === null ? '' : group.matricula;
      return newGroup;
    });
  }

  public createGroup(){
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Grupos Tec 20',
      nzContent: ComposeGroupComponent,
      nzStyle: { width: '80vw' },
      nzComponentParams: {periodId: this._periodId, isTec21: true}
    });

    modal.afterClose.subscribe((result) => {
      if (result?.groups) {
        this.groups = [...result.groups, ...this.groups];
        this.parseGroups();
      }
    });
  }

  public onEdit(data) {
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Grupo',
      nzContent: ComposeGroupComponent,
      nzStyle: { width: '80vw' },
      nzComponentParams: { group: data, isEditing: true, isTec21: true },
    });

    modal.afterClose.subscribe((result) => {
      if (result?.group) {
        const index = this.groups.findIndex(
          (group) => group.id === result.group.id
        );
        Object.assign(this.groups[index], result.group);
      }
    });
  }

  public afterCsvSuccess(data){
    this.groups = [...data, ...this.groups];
  }

  public onDelete(id) {
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id) {
    this.nzModalService.confirm({
      nzTitle: 'Borrar Grupo',
      nzContent:
        '<span style="color: red;">Seguro que deseas borrar este grupo?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteGroup(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  private deleteGroup(id) {
    this.loading = true;
    this.apiService.delete(`/groups21/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.groups = this.groups.filter((group) => group.id !== id);
          this.nzMessageService.success('Grupo borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el grupo');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar el grupo', error);
        this.nzMessageService.error('Ocurrió un error al borrar el grupo');
      }
    );
  }
}
