import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzButtonModule, NzFormModule, NzModalModule, NzSelectModule } from 'ng-zorro-antd';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CsvUploaderComponent } from 'src/app/components/csv-uploader/csv-uploader.component';
import { HttpClientModule } from '@angular/common/http';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DashboardComponent } from './dashboard.component';
import { CoursesComponent } from '../../components/courses/courses.component';
import { ProfessorsComponent } from '../../components/professors/professors.component';
import { TableComponent } from '../../components/table/table.component';
import { SalonesComponent } from '../../components/salones/salones.component';
import { PeriodosComponent } from '../../components/periodos/periodos.component';
import { ComposeCourseComponent } from '../../components/compose-course/compose-course.component';
import { ComposeProfessorComponent } from 'src/app/components/compose-professor/compose-professor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulesComponent } from 'src/app/components/modules/modules.component';
import { ComposeModuleComponent } from 'src/app/components/compose-module/compose-module.component';
import { BlocksComponent } from 'src/app/components/blocks/blocks.component';
import { ComposeBlockComponent } from 'src/app/components/compose-block/compose-block.component';
import { ModulePipe } from 'src/app/components/blocks/module.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    CsvUploaderComponent,
    ProfessorsComponent,
    TableComponent,
    CoursesComponent,
    BlocksComponent,
    ModulesComponent,
    SalonesComponent,
    PeriodosComponent,
    ComposeCourseComponent,
    ComposeProfessorComponent,
    ComposeModuleComponent,
    ComposeBlockComponent,
    ModulePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzUploadModule,
    NzModalModule,
    NzTableModule,
    NzGridModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzFormModule
  ]
})
export class DashboardModule { }
