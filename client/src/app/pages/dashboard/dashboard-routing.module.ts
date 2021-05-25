import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../../components/courses/courses.component';
import { ProfessorsComponent } from '../../components/professors/professors.component';
import { ClassroomsComponent } from '../../components/classrooms/classrooms.component';
import { PeriodsComponent } from '../../components/periods/periods.component';
import { ModulesComponent } from 'src/app/components/modules/modules.component';
import { BlocksComponent } from 'src/app/components/blocks/blocks.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { PeriodComponent } from 'src/app/components/period/period.component';
import { GroupClassroomComponent } from 'src/app/components/group-classroom/group-classroom.component';
import { AvenuesComponent } from 'src/app/components/avenues/avenues.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'periodos',
        component: PeriodsComponent,
      },
      {
        path: 'maestros',
        component: ProfessorsComponent
      },
      {
        path: 'materias',
        component: CoursesComponent
      },
      {
        path: 'modulos',
        component: ModulesComponent
      },
      {
        path: 'bloques',
        component: BlocksComponent
      },
      {
        path: 'salones',
        component: ClassroomsComponent
      },
      {
        path: 'avenidas',
        component: AvenuesComponent
      },
      {
        path: 'periodo/:id',
        component: PeriodComponent
      },
      {
        path: 'periodo/:periodId/salon/:classroomId',
        component: GroupClassroomComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
