import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OperarioRoutingModule } from './operario-routing.module';
import { OperarioDashboardComponent } from './pages/operario-dashboard/operario-dashboard.component';
import { OperarioIncidenciaFormComponent } from './pages/operario-incidencia-form/operario-incidencia-form.component';
import { OperarioIncidenciasListComponent } from './pages/operario-incidencias-list/operario-incidencias-list.component';

@NgModule({
  declarations: [
    OperarioDashboardComponent,
    OperarioIncidenciasListComponent,
    OperarioIncidenciaFormComponent
  ],
  imports: [SharedModule, OperarioRoutingModule]
})
export class OperarioModule {}

