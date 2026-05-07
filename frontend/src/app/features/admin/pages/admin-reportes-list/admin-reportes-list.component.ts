import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthUser } from '../../../../core/models/auth-user.model';
import { ReporteTecnico } from '../../../../core/models/reporte-tecnico.model';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import { ReporteTecnicoService } from '../../../../core/services/reporte-tecnico.service';
import { SessionService } from '../../../../core/services/session.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-admin-reportes-list',
  templateUrl: './admin-reportes-list.component.html',
  styleUrls: ['./admin-reportes-list.component.css'],
  standalone: false
})
export class AdminReportesListComponent implements OnInit {
  reportes: ReporteTecnico[] = [];
  tecnicos: AuthUser[] = [];
  isLoading = true;
  readonly estadosIncidencia = ['ABIERTA', 'ASIGNADA', 'EN_REVISION', 'RESUELTA', 'CERRADA'];
  readonly filtersForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly reporteTecnicoService: ReporteTecnicoService,
    private readonly incidenciaService: IncidenciaService,
    private readonly usuarioService: UsuarioService,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.filtersForm = this.formBuilder.group({
      idIncidencia: [''],
      idTecnico: [''],
      estadoIncidencia: [''],
      fechaDesde: [''],
      fechaHasta: [''],
      incidenciaResuelta: ['']
    });
  }

  ngOnInit(): void {
    this.loadTecnicos();
    this.loadReportes();
  }

  search(): void {
    this.loadReportes();
  }

  clear(): void {
    this.filtersForm.reset({
      idIncidencia: '',
      idTecnico: '',
      estadoIncidencia: '',
      fechaDesde: '',
      fechaHasta: '',
      incidenciaResuelta: ''
    });
    this.loadReportes();
  }

  goToIncidencia(incidenciaId: number): void {
    void this.router.navigate(['/admin/incidencias', incidenciaId]);
  }

  applySuggestedUrgencia(reporte: ReporteTecnico): void {
    const currentUser = this.sessionService.getUser();
    if (!currentUser || !reporte.urgenciaSugerida) {
      return;
    }

    this.incidenciaService.updateUrgencia(reporte.incidenciaId, {
      urgencia: reporte.urgenciaSugerida,
      idUsuario: currentUser.idUsuario
    }).subscribe({
      next: () => {
        this.toastService.show({
          id: 0,
          type: 'success',
          titleKey: 'toast.success.title',
          messageKey: 'admin.reports.actionSuccess'
        });
        this.loadReportes();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error applying suggested urgency', error);
        this.toastService.show({
          id: 0,
          type: 'error',
          titleKey: 'toast.error.title',
          messageKey: 'admin.reports.actionError'
        });
      }
    });
  }

  markEnRevision(reporte: ReporteTecnico): void {
    const currentUser = this.sessionService.getUser();
    if (!currentUser) {
      return;
    }

    this.incidenciaService.updateEstado(reporte.incidenciaId, {
      estado: 'EN_REVISION',
      idUsuario: currentUser.idUsuario
    }).subscribe({
      next: () => {
        this.toastService.show({
          id: 0,
          type: 'success',
          titleKey: 'toast.success.title',
          messageKey: 'admin.reports.actionSuccess'
        });
        this.loadReportes();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error marking incident as under review', error);
        this.toastService.show({
          id: 0,
          type: 'error',
          titleKey: 'toast.error.title',
          messageKey: 'admin.reports.actionError'
        });
      }
    });
  }

  closeIncidencia(reporte: ReporteTecnico): void {
    const currentUser = this.sessionService.getUser();
    if (!currentUser) {
      return;
    }

    this.incidenciaService.updateEstado(reporte.incidenciaId, {
      estado: 'CERRADA',
      idUsuario: currentUser.idUsuario
    }).subscribe({
      next: () => {
        this.toastService.show({
          id: 0,
          type: 'success',
          titleKey: 'toast.success.title',
          messageKey: 'admin.reports.actionSuccess'
        });
        this.loadReportes();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error closing incident from report review', error);
        this.toastService.show({
          id: 0,
          type: 'error',
          titleKey: 'toast.error.title',
          messageKey: 'admin.reports.actionError'
        });
      }
    });
  }

  canApplyUrgencia(reporte: ReporteTecnico): boolean {
    return !!reporte.urgenciaSugerida && reporte.urgenciaSugerida !== reporte.urgenciaActualIncidencia;
  }

  canMarkEnRevision(reporte: ReporteTecnico): boolean {
    return reporte.estadoIncidencia !== 'EN_REVISION' && reporte.estadoIncidencia !== 'CERRADA';
  }

  canCloseIncidencia(reporte: ReporteTecnico): boolean {
    return reporte.estadoIncidencia !== 'CERRADA';
  }

  private loadTecnicos(): void {
    this.usuarioService.getTecnicos().subscribe({
      next: (tecnicos) => {
        this.ngZone.run(() => {
          this.tecnicos = tecnicos;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading technicians for reports filter', error);
        this.ngZone.run(() => {
          this.tecnicos = [];
          this.changeDetectorRef.markForCheck();
        });
      }
    });
  }

  private loadReportes(): void {
    this.isLoading = true;
    this.reporteTecnicoService.getAll(this.buildFilters()).subscribe({
      next: (reportes) => {
        this.ngZone.run(() => {
          this.reportes = reportes;
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading technical reports for administrator', error);
        this.ngZone.run(() => {
          this.reportes = [];
          this.isLoading = false;
          this.toastService.show({
            id: 0,
            type: 'error',
            titleKey: 'toast.error.title',
            messageKey: 'admin.reports.loadError'
          });
          this.changeDetectorRef.markForCheck();
        });
      }
    });
  }

  private buildFilters(): {
    idIncidencia?: number | null;
    idTecnico?: number | null;
    estadoIncidencia?: string | null;
    fechaDesde?: string | null;
    fechaHasta?: string | null;
    incidenciaResuelta?: string | null;
  } {
    const rawValue = this.filtersForm.getRawValue();

    return {
      idIncidencia: rawValue.idIncidencia ? Number(rawValue.idIncidencia) : null,
      idTecnico: rawValue.idTecnico ? Number(rawValue.idTecnico) : null,
      estadoIncidencia: rawValue.estadoIncidencia || null,
      fechaDesde: rawValue.fechaDesde || null,
      fechaHasta: rawValue.fechaHasta || null,
      incidenciaResuelta: rawValue.incidenciaResuelta || null
    };
  }
}
