import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzButtonModule, NzModalModule, NzSelectModule } from 'ng-zorro-antd';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CsvUploaderComponent } from 'src/app/components/csv-uploader/csv-uploader.component';
import { HttpClientModule } from '@angular/common/http';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DashboardComponent } from './dashboard.component';
import { ProfessorsComponent } from '../../components/professors/professors.component';
import { MateriasComponent } from '../../components/materias/materias.component';
import { TableComponent } from '../../components/table/table.component';
import { ModulosComponent } from '../../components/modulos/modulos.component';
import { BloquesComponent } from '../../components/bloques/bloques.component';
import { SalonesComponent } from '../../components/salones/salones.component';
import { PeriodosComponent } from '../../components/periodos/periodos.component';
import { ComposeProfessorComponent } from 'src/app/components/compose-professor/compose-professor.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    CsvUploaderComponent,
    ProfessorsComponent,
    TableComponent,
    MateriasComponent,
    ModulosComponent,
    BloquesComponent,
    SalonesComponent,
    PeriodosComponent,
    ComposeProfessorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzUploadModule,
    NzModalModule,
    NzTableModule,
    NzGridModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule
  ]
})
export class DashboardModule { }
