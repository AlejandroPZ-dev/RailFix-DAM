import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Incidencia } from '../../../../core/models/incidencia.model';
import { Linea } from '../../../../core/models/linea.model';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import { LineaService } from '../../../../core/services/linea.service';

@Component({
  selector: 'app-admin-incidencias-list',
  templateUrl: './admin-incidencias-list.component.html',
  styleUrls: ['./admin-incidencias-list.component.css'],
  standalone: false
})
export class AdminIncidenciasListComponent implements OnInit, OnDestroy {
  incidencias: Incidencia[] = [];
  lineas: Linea[] = [];
  selectedIncidencia: Incidencia | null = null;
  isLoading = true;

  filters = {
    estado: '',
    urgencia: '',
    lineaId: ''
  };

  readonly estados = ['ABIERTA', 'ASIGNADA', 'EN_REVISION', 'RESUELTA', 'CERRADA'];
  readonly urgencias = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  private refreshSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly incidenciaService: IncidenciaService,
    private readonly lineaService: LineaService,
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadIncidencias();

    this.lineaService.getAll().subscribe((lineas) => {
      this.ngZone.run(() => {
        this.lineas = lineas;
        this.changeDetectorRef.markForCheck();
      });
    });

    this.refreshSubscription = this.incidenciaService.incidenciasUpdated$.subscribe(() => {
      this.loadIncidencias();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  get filteredIncidencias(): Incidencia[] {
    return this.incidencias.filter((incidencia) => {
      const matchesEstado = !this.filters.estado || incidencia.estado === this.filters.estado;
      const matchesUrgencia = !this.filters.urgencia || incidencia.urgencia === this.filters.urgencia;
      const matchesLinea = !this.filters.lineaId || incidencia.lineaId === Number(this.filters.lineaId);

      return matchesEstado && matchesUrgencia && matchesLinea;
    });
  }

  selectIncidencia(incidencia: Incidencia): void {
    this.selectedIncidencia = incidencia;
  }

  goToSelectedDetail(): void {
    if (!this.selectedIncidencia) {
      return;
    }

    void this.router.navigate(['/admin/incidencias', this.selectedIncidencia.id]);
  }

  private loadIncidencias(): void {
    this.isLoading = true;
    this.incidenciaService.getAll().subscribe((incidencias) => {
      this.ngZone.run(() => {
        this.incidencias = incidencias;
        if (this.selectedIncidencia) {
          this.selectedIncidencia =
            incidencias.find((incidencia) => incidencia.id === this.selectedIncidencia?.id) ?? null;
        }
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      });
    });
  }
}
