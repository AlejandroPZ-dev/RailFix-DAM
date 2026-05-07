import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminIncidenciaDetailComponent } from './pages/admin-incidencia-detail/admin-incidencia-detail.component';
import { AdminIncidenciasListComponent } from './pages/admin-incidencias-list/admin-incidencias-list.component';
import { AdminReportesListComponent } from './pages/admin-reportes-list/admin-reportes-list.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminIncidenciasListComponent,
    AdminIncidenciaDetailComponent,
    AdminReportesListComponent
  ],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
