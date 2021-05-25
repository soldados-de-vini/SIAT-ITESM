import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzDescriptionsModule,
  NzFormModule,
  NzInputNumberModule,
  NzListModule,
  NzModalModule,
  NzPageHeaderModule,
  NzPopoverModule,
  NzRadioModule,
  NzSelectModule,
  NzSkeletonModule,
  NzTabsModule,
  NzTimePickerModule,
} from 'ng-zorro-antd';
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
import { ClassroomsComponent } from '../../components/classrooms/classrooms.component';
import { ComposeCourseComponent } from '../../components/compose-course/compose-course.component';
import { ComposeProfessorComponent } from 'src/app/components/compose-professor/compose-professor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComposeClassroomComponent } from 'src/app/components/compose-classroom/compose-classroom.component';
import { ModulesComponent } from 'src/app/components/modules/modules.component';
import { ComposeModuleComponent } from 'src/app/components/compose-module/compose-module.component';
import { BlocksComponent } from 'src/app/components/blocks/blocks.component';
import { ComposeBlockComponent } from 'src/app/components/compose-block/compose-block.component';
import { ModulePipe } from 'src/app/components/blocks/module.pipe';
import { PeriodsComponent } from 'src/app/components/periods/periods.component';
import { ComposePeriodComponent } from 'src/app/components/compose-period/compose-period.component';
import { PeriodComponent } from 'src/app/components/period/period.component';
import { Groups20Component } from 'src/app/components/groups20/groups20.component';
import { Groups21Component } from 'src/app/components/groups21/groups21.component';
import { ComposeGroupComponent } from 'src/app/components/compose-group20/compose-group.component';
import { PeriodClassroomListComponent } from 'src/app/components/period-classroom-list/period-classroom-list.component';
import { GroupClassroomComponent } from 'src/app/components/group-classroom/group-classroom.component';
import { GroupAssignmentComponent } from 'src/app/components/group-assignment/group-assignment.component';
import { ScheduleTableComponent } from 'src/app/components/schedule-table/schedule-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CsvUploaderComponent,
    ProfessorsComponent,
    TableComponent,
    CoursesComponent,
    ClassroomsComponent,
    PeriodsComponent,
    ComposePeriodComponent,
    ComposeCourseComponent,
    ComposeProfessorComponent,
    ComposeClassroomComponent,
    BlocksComponent,
    ModulesComponent,
    ComposeModuleComponent,
    ComposeBlockComponent,
    ModulePipe,
    PeriodComponent,
    Groups20Component,
    Groups21Component,
    ComposeGroupComponent,
    PeriodClassroomListComponent,
    GroupClassroomComponent,
    GroupAssignmentComponent,
    ScheduleTableComponent
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
    NzFormModule,
    NzDatePickerModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzTabsModule,
    NzSkeletonModule,
    NzRadioModule,
    NzCardModule,
    NzListModule,
    NzCheckboxModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzCollapseModule,
    NzPopoverModule
  ],
})
export class DashboardModule {}
