import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminIncidenciaDetailComponent } from './pages/admin-incidencia-detail/admin-incidencia-detail.component';
import { AdminIncidenciasListComponent } from './pages/admin-incidencias-list/admin-incidencias-list.component';
import { AdminReportesListComponent } from './pages/admin-reportes-list/admin-reportes-list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'incidencias',
    component: AdminIncidenciasListComponent
  },
  {
    path: 'incidencias/:id',
    component: AdminIncidenciaDetailComponent
  },
  {
    path: 'reportes',
    component: AdminReportesListComponent
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
export class AdminRoutingModule {}
