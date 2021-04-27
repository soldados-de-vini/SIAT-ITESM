import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../../components/courses/courses.component';
import { ProfessorsComponent } from '../../components/professors/professors.component';
import { ModulosComponent } from '../../components/modulos/modulos.component';
import { BloquesComponent } from '../../components/bloques/bloques.component';
import { ClassroomsComponent } from '../../components/classrooms/classrooms.component';
import { PeriodosComponent } from '../../components/periodos/periodos.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
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
    component: ModulosComponent
  },
  {
    path: 'bloques',
    component: BloquesComponent
  },
  {
    path: 'salones',
    component: ClassroomsComponent
  },
  {
    path: '',
    redirectTo: 'periodos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
