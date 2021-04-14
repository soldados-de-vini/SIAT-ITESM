import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestrosComponent } from '../../components/maestros/maestros.component';
import { MateriasComponent } from '../../components/materias/materias.component';
import { ModulosComponent } from '../../components/modulos/modulos.component';
import { BloquesComponent } from '../../components/bloques/bloques.component';
import { SalonesComponent } from '../../components/salones/salones.component';


const routes: Routes = [
  {
    path: 'maestros',
    component: MaestrosComponent
  },
  {
    path: 'materias',
    component: MateriasComponent
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
    component: SalonesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
