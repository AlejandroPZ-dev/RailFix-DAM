import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TecnicoRoutingModule } from './tecnico-routing.module';
import { TecnicoDashboardComponent } from './pages/tecnico-dashboard/tecnico-dashboard.component';
import { TecnicoIncidenciaDetailComponent } from './pages/tecnico-incidencia-detail/tecnico-incidencia-detail.component';
import { TecnicoIncidenciasListComponent } from './pages/tecnico-incidencias-list/tecnico-incidencias-list.component';
import { TecnicoReporteFormComponent } from './pages/tecnico-reporte-form/tecnico-reporte-form.component';

@NgModule({
  declarations: [
    TecnicoDashboardComponent,
    TecnicoIncidenciasListComponent,
    TecnicoIncidenciaDetailComponent,
    TecnicoReporteFormComponent
  ],
  imports: [SharedModule, TecnicoRoutingModule]
})
export class TecnicoModule {}

