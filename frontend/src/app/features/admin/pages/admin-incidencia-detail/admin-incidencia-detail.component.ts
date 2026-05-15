import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdjuntoIncidencia } from '../../../../core/models/adjunto-incidencia.model';
import { Asignacion } from '../../../../core/models/asignacion.model';
import { AuthUser } from '../../../../core/models/auth-user.model';
import { HistorialIncidencia } from '../../../../core/models/historial-incidencia.model';
import { Incidencia } from '../../../../core/models/incidencia.model';
import { ReporteTecnico } from '../../../../core/models/reporte-tecnico.model';
import { AdjuntosService } from '../../../../core/services/adjuntos.service';
import { AsignacionService } from '../../../../core/services/asignacion.service';
import { HistorialIncidenciaService } from '../../../../core/services/historial-incidencia.service';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import { ReporteTecnicoService } from '../../../../core/services/reporte-tecnico.service';
import { SessionService } from '../../../../core/services/session.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-admin-incidencia-detail',
  templateUrl: './admin-incidencia-detail.component.html',
  styleUrls: ['./admin-incidencia-detail.component.css'],
  standalone: false
})
export class AdminIncidenciaDetailComponent implements OnInit {
  incidencia?: Incidencia;
  asignaciones: Asignacion[] = [];
  historial: HistorialIncidencia[] = [];
  reportes: ReporteTecnico[] = [];
  adjuntos: AdjuntoIncidencia[] = [];
  tecnicos: AuthUser[] = [];
  descriptionValue = '';
  estadoValue = 'ABIERTA';
  selectedTecnicoIds: number[] = [];
  isLoading = true;
  loadError = false;
  isSavingDescription = false;
  isSavingStatus = false;
  isAssigning = false;
  readonly imageLoadErrors: Record<number, boolean> = {};

  readonly estados = ['ABIERTA', 'ASIGNADA', 'EN_REVISION', 'RESUELTA', 'CERRADA'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly incidenciaService: IncidenciaService,
    private readonly adjuntosService: AdjuntosService,
    private readonly asignacionService: AsignacionService,
    private readonly historialIncidenciaService: HistorialIncidenciaService,
    private readonly reporteTecnicoService: ReporteTecnicoService,
    private readonly usuarioService: UsuarioService,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.loadError = true;
      this.isLoading = false;
      return;
    }

    this.usuarioService.getTecnicos().subscribe({
      next: (tecnicos) => {
        this.ngZone.run(() => {
          this.tecnicos = tecnicos;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading technicians', error);
        this.tecnicos = [];
      }
    });

    this.refreshDetail(id);
  }

  get availableTecnicos(): AuthUser[] {
    const assignedIds = new Set(this.asignaciones.map((asignacion) => asignacion.tecnicoId));
    return this.tecnicos.filter((tecnico) => !assignedIds.has(tecnico.idUsuario));
  }

  saveDescription(): void {
    if (!this.incidencia || !this.descriptionValue.trim()) {
      this.showError('admin.detail.descriptionError');
      return;
    }

    const administrador = this.sessionService.getUser();
    if (!administrador) {
      this.showError('admin.detail.descriptionError');
      return;
    }

    this.isSavingDescription = true;
    this.incidenciaService.updateDescripcion(this.incidencia.id, {
      descripcion: this.descriptionValue.trim(),
      idUsuario: administrador.idUsuario
    }).subscribe({
      next: (incidencia) => {
        this.ngZone.run(() => {
          this.applyIncidencia(incidencia);
          this.loadHistorial(incidencia.id);
          this.showSuccess('admin.detail.descriptionSuccess');
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error saving incident description', error);
        this.showError('admin.detail.descriptionError');
        this.isSavingDescription = false;
      },
      complete: () => {
        this.isSavingDescription = false;
      }
    });
  }

  saveStatus(): void {
    if (!this.incidencia || !this.estadoValue) {
      this.showError('admin.detail.statusError');
      return;
    }

    const administrador = this.sessionService.getUser();
    if (!administrador) {
      this.showError('admin.detail.statusError');
      return;
    }

    this.isSavingStatus = true;
    this.incidenciaService.updateEstado(this.incidencia.id, {
      estado: this.estadoValue,
      idUsuario: administrador.idUsuario
    }).subscribe({
      next: (incidencia) => {
        this.ngZone.run(() => {
          this.applyIncidencia(incidencia);
          this.loadHistorial(incidencia.id);
          this.showSuccess('admin.detail.statusSuccess');
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error saving incident status', error);
        this.showError('admin.detail.statusError');
        this.isSavingStatus = false;
      },
      complete: () => {
        this.isSavingStatus = false;
      }
    });
  }

  assignTecnicos(): void {
    if (!this.incidencia) {
      return;
    }

    const administrador = this.sessionService.getUser();
    if (!administrador) {
      this.showError('admin.detail.assignError');
      return;
    }

    const tecnicoIds = this.selectedTecnicoIds.map((id) => Number(id)).filter((id) => id > 0);
    if (tecnicoIds.length === 0) {
      this.showError('admin.detail.assignError');
      return;
    }

    this.isAssigning = true;
    this.asignacionService.create(this.incidencia.id, {
      tecnicoIds,
      idAdministrador: administrador.idUsuario
    }).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.selectedTecnicoIds = [];
          this.loadIncidencia(this.incidencia!.id);
          this.loadAsignaciones(this.incidencia!.id);
          this.loadHistorial(this.incidencia!.id);
          this.showSuccess('admin.detail.assignSuccess');
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error assigning technicians', error);
        this.showError('admin.detail.assignError');
        this.isAssigning = false;
      },
      complete: () => {
        this.isAssigning = false;
      }
    });
  }

  removeAsignacion(asignacion: Asignacion): void {
    if (!this.incidencia) {
      return;
    }

    this.asignacionService.delete(this.incidencia.id, asignacion.idAsignacion).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.loadAsignaciones(this.incidencia!.id);
          this.loadHistorial(this.incidencia!.id);
          this.showSuccess('admin.detail.removeSuccess');
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error removing assignment', error);
        this.showError('admin.detail.removeError');
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
      this.showError('location.openUnavailable');
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitud},${coordinates.longitud}`;
    const openedWindow = window.open(url, '_blank');

    if (!openedWindow) {
      console.warn('Could not open incident location', coordinates);
      this.showError('location.openError');
    }
  }

  getPrecisionValue(): number | null {
    if (!this.incidencia || this.incidencia.precisionGpsMetros === null || this.incidencia.precisionGpsMetros === undefined) {
      return null;
    }

    const precision = Number(this.incidencia.precisionGpsMetros);
    return Number.isFinite(precision) ? precision : null;
  }

  private refreshDetail(id: number): void {
    this.isLoading = true;
    this.loadError = false;
    this.loadIncidencia(id);
    this.loadAdjuntos(id);
    this.loadAsignaciones(id);
    this.loadHistorial(id);
    this.loadReportes(id);
  }

  private loadIncidencia(id: number): void {
    this.incidenciaService.getById(id).subscribe({
      next: (incidencia) => {
        this.ngZone.run(() => {
          this.applyIncidencia(incidencia);
          this.isLoading = false;
          this.loadError = false;
          this.changeDetectorRef.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error loading incident detail', error);
        this.ngZone.run(() => {
          this.loadError = true;
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        });
      }
    });
  }

  private loadAsignaciones(id: number): void {
    this.asignacionService.getByIncidencia(id).subscribe({
      next: (asignaciones) => {
        this.ngZone.run(() => {
          this.asignaciones = asignaciones;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading assignments', error);
        this.asignaciones = [];
      }
    });
  }

  private loadAdjuntos(id: number): void {
    this.adjuntosService.getAdjuntosByIncidencia(id).subscribe({
      next: (adjuntos) => {
        this.ngZone.run(() => {
          this.adjuntos = adjuntos;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading incident attachments', error);
        this.adjuntos = [];
      }
    });
  }

  private loadHistorial(id: number): void {
    this.historialIncidenciaService.getByIncidencia(id).subscribe({
      next: (historial) => {
        this.ngZone.run(() => {
          this.historial = historial;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading incident history', error);
        this.historial = [];
      }
    });
  }

  private loadReportes(id: number): void {
    this.reporteTecnicoService.getByIncidencia(id).subscribe({
      next: (reportes) => {
        this.ngZone.run(() => {
          this.reportes = reportes;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error) => {
        console.error('Error loading technical reports', error);
        this.reportes = [];
      }
    });
  }

  private applyIncidencia(incidencia: Incidencia): void {
    this.incidencia = incidencia;
    this.descriptionValue = incidencia.descripcion ?? '';
    this.estadoValue = incidencia.estado ?? 'ABIERTA';
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

  private showSuccess(messageKey: string): void {
    this.toastService.show({
      id: 0,
      type: 'success',
      titleKey: 'toast.success.title',
      messageKey
    });
  }

  private showError(messageKey: string): void {
    this.toastService.show({
      id: 0,
      type: 'error',
      titleKey: 'toast.error.title',
      messageKey
    });
  }
}
