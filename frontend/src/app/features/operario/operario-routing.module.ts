import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperarioDashboardComponent } from './pages/operario-dashboard/operario-dashboard.component';
import { OperarioIncidenciaFormComponent } from './pages/operario-incidencia-form/operario-incidencia-form.component';
import { OperarioIncidenciasListComponent } from './pages/operario-incidencias-list/operario-incidencias-list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: OperarioDashboardComponent
  },
  {
    path: 'incidencias',
    component: OperarioIncidenciasListComponent
  },
  {
    path: 'incidencias/nueva',
    component: OperarioIncidenciaFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperarioRoutingModule {}

