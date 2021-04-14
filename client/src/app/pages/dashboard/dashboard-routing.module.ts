import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestrosComponent } from '../maestros/maestros.component';


const routes: Routes = [
  {
    path: 'maestros',
    component: MaestrosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
