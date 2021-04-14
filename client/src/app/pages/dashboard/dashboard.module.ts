import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzButtonModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DashboardComponent } from './dashboard.component';
import { MaestrosComponent } from '../../components/maestros/maestros.component';
import { MateriasComponent } from '../../components/materias/materias.component';
import { TableComponent } from '../../components/table/table.component';
import { ModulosComponent } from '../../components/modulos/modulos.component';
import { BloquesComponent } from '../../components/bloques/bloques.component';
import { SalonesComponent } from '../../components/salones/salones.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MaestrosComponent,
    TableComponent,
    MateriasComponent,
    ModulosComponent,
    BloquesComponent,
    SalonesComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzGridModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule
  ]
})
export class DashboardModule { }
