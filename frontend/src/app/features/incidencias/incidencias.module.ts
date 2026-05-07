import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { IncidenciasComponent } from './incidencias.component';

@NgModule({
  declarations: [IncidenciasComponent],
  imports: [SharedModule, IncidenciasRoutingModule]
})
export class IncidenciasModule {}

