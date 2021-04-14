import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloquesComponent } from 'src/app/components/bloques/bloques.component';
import { ModulosComponent } from 'src/app/components/modulos/modulos.component';
import { SalonesComponent } from 'src/app/components/salones/salones.component';
import { MaestrosComponent } from '../../components/maestros/maestros.component';
import { MateriasComponent } from '../../components/materias/materias.component';


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
