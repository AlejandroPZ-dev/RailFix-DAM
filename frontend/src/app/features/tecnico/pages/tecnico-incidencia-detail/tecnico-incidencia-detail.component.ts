import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ReporteTecnico } from '../../../../core/models/reporte-tecnico.model';
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
  isLoading = true;
  loadErrorKey = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly asignacionService: AsignacionService,
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
}
