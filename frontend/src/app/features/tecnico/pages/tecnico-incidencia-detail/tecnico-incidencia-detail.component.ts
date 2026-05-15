import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { AdjuntoIncidencia } from '../../../../core/models/adjunto-incidencia.model';
import { ReporteTecnico } from '../../../../core/models/reporte-tecnico.model';
import { AdjuntosService } from '../../../../core/services/adjuntos.service';
import { TecnicoIncidenciaDetail } from '../../../../core/models/tecnico-incidencia-detail.model';
import { AsignacionService } from '../../../../core/services/asignacion.service';
import { ReporteTecnicoService } from '../../../../core/services/reporte-tecnico.service';
import { SessionService } from '../../../../core/services/session.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-tecnico-incidencia-detail',
  templateUrl: './tecnico-incidencia-detail.component.html',
  styleUrls: ['./tecnico-incidencia-detail.component.css'],
  standalone: false
})
export class TecnicoIncidenciaDetailComponent implements OnInit {
  incidencia?: TecnicoIncidenciaDetail;
  reportes: ReporteTecnico[] = [];
  adjuntos: AdjuntoIncidencia[] = [];
  isLoading = true;
  loadErrorKey = '';
  readonly imageLoadErrors: Record<number, boolean> = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly asignacionService: AsignacionService,
    private readonly adjuntosService: AdjuntosService,
    private readonly reporteTecnicoService: ReporteTecnicoService,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const currentUser = this.sessionService.getUser();

    if (!currentUser || !id) {
      this.isLoading = false;
      this.loadErrorKey = 'tecnico.detail.forbidden';
      return;
    }

    this.asignacionService.getIncidenciaDetailByTecnico(currentUser.idUsuario, id).subscribe({
      next: (incidencia) => {
        this.ngZone.run(() => {
          this.incidencia = incidencia;
          this.isLoading = false;
          this.loadErrorKey = '';
          this.changeDetectorRef.detectChanges();
          this.loadAdjuntos(id);
          this.loadReports(currentUser.idUsuario, id);
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading technician incident detail', error);
        this.ngZone.run(() => {
          this.isLoading = false;
          this.loadErrorKey = error.status === 403 || error.status === 404
            ? 'tecnico.detail.forbidden'
            : 'tecnico.detail.loadError';

          this.toastService.show({
            id: 0,
            type: 'error',
            titleKey: 'toast.error.title',
            messageKey: this.loadErrorKey
          });
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  getAdjuntoUrl(idAdjunto: number): string {
    return this.adjuntosService.getAdjuntoDownloadUrl(idAdjunto);
  }

  markImageError(idAdjunto: number): void {
    this.imageLoadErrors[idAdjunto] = true;
  }

  formatBytes(size: number): string {
    if (size >= 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    if (size >= 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${size} B`;
  }

  hasValidCoordinates(): boolean {
    const coordinates = this.getCoordinates();
    return coordinates !== null;
  }

  openLocation(): void {
    const coordinates = this.getCoordinates();
    if (!coordinates) {
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'location.openUnavailable'
      });
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitud},${coordinates.longitud}`;
    const openedWindow = window.open(url, '_blank');

    if (!openedWindow) {
      console.warn('Could not open incident location for technician', coordinates);
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'location.openError'
      });
    }
  }

  getPrecisionValue(): number | null {
    if (!this.incidencia || this.incidencia.precisionGpsMetros === null || this.incidencia.precisionGpsMetros === undefined) {
      return null;
    }

    const precision = Number(this.incidencia.precisionGpsMetros);
    return Number.isFinite(precision) ? precision : null;
  }

  private loadReports(tecnicoId: number, incidenciaId: number): void {
    this.reporteTecnicoService.getByTecnicoAndIncidencia(tecnicoId, incidenciaId).subscribe({
      next: (reportes) => {
        this.ngZone.run(() => {
          this.reportes = reportes;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading technician reports', error);
        this.ngZone.run(() => {
          this.reportes = [];
          this.changeDetectorRef.markForCheck();
        });
      }
    });
  }

  private loadAdjuntos(incidenciaId: number): void {
    this.adjuntosService.getAdjuntosByIncidencia(incidenciaId).subscribe({
      next: (adjuntos) => {
        this.ngZone.run(() => {
          this.adjuntos = adjuntos;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading incident attachments for technician', error);
        this.ngZone.run(() => {
          this.adjuntos = [];
          this.changeDetectorRef.markForCheck();
        });
      }
    });
  }

  private getCoordinates(): { latitud: number; longitud: number } | null {
    if (!this.incidencia) {
      return null;
    }

    if (
      this.incidencia.latitud === null
      || this.incidencia.latitud === undefined
      || this.incidencia.longitud === null
      || this.incidencia.longitud === undefined
    ) {
      return null;
    }

    const latitud = Number(this.incidencia.latitud);
    const longitud = Number(this.incidencia.longitud);

    if (!Number.isFinite(latitud) || !Number.isFinite(longitud)) {
      return null;
    }

    if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
      return null;
    }

    return { latitud, longitud };
  }
}
