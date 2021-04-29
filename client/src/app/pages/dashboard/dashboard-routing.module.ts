import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../../components/courses/courses.component';
import { ProfessorsComponent } from '../../components/professors/professors.component';
import { ClassroomsComponent } from '../../components/classrooms/classrooms.component';
import { PeriodosComponent } from '../../components/periodos/periodos.component';
import { ModulesComponent } from 'src/app/components/modules/modules.component';
import { BlocksComponent } from 'src/app/components/blocks/blocks.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'periodos',
        component: PeriodosComponent,
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
