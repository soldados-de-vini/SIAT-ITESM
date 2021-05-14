import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Course } from 'src/app/models/course.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ComposeBlockComponent } from '../compose-block/compose-block.component';

@Component({
  selector: 'siat-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksComponent implements OnInit {
  public blocks: Array<Course> = [];
  public columnsToDisplay = [
    'CLAVE',
    'Nombre',
    'Capacidad',
    'Semestre',
    'Semana inicial',
    'Semanas',
    'Avenida(s)',
    'Tipo',
    'Modulos'
  ];
  public loading: boolean;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.get('/courses21').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.blocks = response.result;
        } else {
          this.nzMessageService.error('Error al cargar los bloques');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar bloques');
        console.log('Error al cargar bloques', error);
      }
    );
  }

  public createBlock() {
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Bloque',
      nzContent: ComposeBlockComponent,
      nzStyle: { width: '80vw' },
    });

    modal.afterClose.subscribe((result) => {
      if (result?.blocks) {
        this.blocks = [...result.blocks, ...this.blocks];
      }
    });
  }

  public onEdit(data) {
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Bloque',
      nzContent: ComposeBlockComponent,
      nzStyle: { width: '80vw' },
      nzComponentParams: { block: data, isEditing: true },
    });

    modal.afterClose.subscribe((result) => {
      if (result?.block) {
        const index = this.blocks.findIndex(
          (block) => block.id === result.block.id
        );
        Object.assign(this.blocks[index], result.block);
      }
    });
  }

  public onDelete(id) {
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id) {
    this.nzModalService.confirm({
      nzTitle: 'Borrar Bloque',
      nzContent:
        '<span style="color: red;">Seguro que deseas borrar este bloque?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteBlock(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  public afterCsvSuccess(data){
    this.blocks = [...data, ...this.blocks];
  }

  private deleteBlock(id) {
    this.loading = true;
    this.apiService.delete(`/courses21/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200) {
          this.blocks = this.blocks.filter((block) => block.id !== id);
          this.nzMessageService.success('Bloque borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el bloque');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar el bloque', error);
        this.nzMessageService.error('Ocurrió un error al borrar el bloque');
      }
    );
  }
}
