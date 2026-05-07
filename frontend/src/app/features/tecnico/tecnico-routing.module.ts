import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TecnicoDashboardComponent } from './pages/tecnico-dashboard/tecnico-dashboard.component';
import { TecnicoIncidenciaDetailComponent } from './pages/tecnico-incidencia-detail/tecnico-incidencia-detail.component';
import { TecnicoIncidenciasListComponent } from './pages/tecnico-incidencias-list/tecnico-incidencias-list.component';
import { TecnicoReporteFormComponent } from './pages/tecnico-reporte-form/tecnico-reporte-form.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: TecnicoDashboardComponent
  },
  {
    path: 'incidencias',
    component: TecnicoIncidenciasListComponent
  },
  {
    path: 'incidencias/:id',
    component: TecnicoIncidenciaDetailComponent
  },
  {
    path: 'incidencias/:id/reporte',
    component: TecnicoReporteFormComponent
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
export class TecnicoRoutingModule {}

