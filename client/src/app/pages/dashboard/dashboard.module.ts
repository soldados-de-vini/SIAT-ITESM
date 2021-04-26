import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzButtonModule, NzModalModule } from 'ng-zorro-antd';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CsvUploaderComponent } from 'src/app/components/csv-uploader/csv-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DashboardComponent } from './dashboard.component';
import { MaestrosComponent } from '../../components/maestros/maestros.component';
import { CoursesComponent } from '../../components/courses/courses.component';
import { TableComponent } from '../../components/table/table.component';
import { ModulosComponent } from '../../components/modulos/modulos.component';
import { BloquesComponent } from '../../components/bloques/bloques.component';
import { SalonesComponent } from '../../components/salones/salones.component';
import { PeriodosComponent } from '../../components/periodos/periodos.component';
import { ComposeCourseComponent } from '../../components/compose-course/compose-course.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CsvUploaderComponent,
    MaestrosComponent,
    TableComponent,
    CoursesComponent,
    ModulosComponent,
    BloquesComponent,
    SalonesComponent,
    PeriodosComponent,
    ComposeCourseComponent,
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
    NzIconModule
  ]
})
export class DashboardModule { }
