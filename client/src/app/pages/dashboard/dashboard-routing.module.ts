import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestrosComponent } from '../maestros/maestros.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: 'maestros',
    component: MaestrosComponent
  },
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
