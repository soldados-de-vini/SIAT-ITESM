import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NzButtonModule, NzModalModule } from 'ng-zorro-antd';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CsvUploaderComponent } from 'src/app/components/csv-uploader/csv-uploader.component';
import { MaestrosComponent } from '../maestros/maestros.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableComponent } from '../table/table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CsvUploaderComponent,
    MaestrosComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzButtonModule,
    NzUploadModule,
    NzModalModule
    NzTableModule,
    NzGridModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule
  ]
})
export class DashboardModule { }
