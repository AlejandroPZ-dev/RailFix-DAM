import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TecnicoIncidencia } from '../../../../core/models/tecnico-incidencia.model';
import { AsignacionService } from '../../../../core/services/asignacion.service';
import { SessionService } from '../../../../core/services/session.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-tecnico-incidencias-list',
  templateUrl: './tecnico-incidencias-list.component.html',
  styleUrls: ['./tecnico-incidencias-list.component.css'],
  standalone: false
})
export class TecnicoIncidenciasListComponent implements OnInit {
  incidencias: TecnicoIncidencia[] = [];
  selectedIncidencia: TecnicoIncidencia | null = null;
  isLoading = true;
  filters = {
    estado: '',
    urgencia: '',
    estadoAsignacion: ''
  };

  readonly estados = ['ABIERTA', 'ASIGNADA', 'EN_REVISION', 'RESUELTA', 'CERRADA'];
  readonly urgencias = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  readonly estadosAsignacion = ['ASIGNADA', 'EN_CURSO', 'FINALIZADA'];

  constructor(
    private readonly router: Router,
    private readonly asignacionService: AsignacionService,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadIncidencias();
  }

  get filteredIncidencias(): TecnicoIncidencia[] {
    return this.incidencias.filter((incidencia) => {
      const matchesEstado = !this.filters.estado || incidencia.estado === this.filters.estado;
      const matchesUrgencia = !this.filters.urgencia || incidencia.urgencia === this.filters.urgencia;
      const matchesEstadoAsignacion =
        !this.filters.estadoAsignacion || incidencia.estadoAsignacion === this.filters.estadoAsignacion;

      return matchesEstado && matchesUrgencia && matchesEstadoAsignacion;
    });
  }

  selectIncidencia(incidencia: TecnicoIncidencia): void {
    this.selectedIncidencia = incidencia;
  }

  goToSelectedDetail(): void {
    if (!this.selectedIncidencia) {
      return;
    }

    void this.router.navigate(['/tecnico/incidencias', this.selectedIncidencia.id]);
  }

  private loadIncidencias(): void {
    const currentUser = this.sessionService.getUser();
    if (!currentUser) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.asignacionService.getIncidenciasByTecnico(currentUser.idUsuario).subscribe({
      next: (incidencias) => {
        this.ngZone.run(() => {
          this.incidencias = incidencias;
          if (this.selectedIncidencia) {
            this.selectedIncidencia =
              incidencias.find((incidencia) => incidencia.id === this.selectedIncidencia?.id) ?? null;
          }
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading technician incidents', error);
        this.ngZone.run(() => {
          this.toastService.show({
            id: 0,
            type: 'error',
            titleKey: 'toast.error.title',
            messageKey: 'tecnico.list.loadError'
          });
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        });
      }
    });
  }
}
