import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../../../core/services/session.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ReporteTecnicoService } from '../../../../core/services/reporte-tecnico.service';

@Component({
  selector: 'app-tecnico-reporte-form',
  templateUrl: './tecnico-reporte-form.component.html',
  styleUrls: ['./tecnico-reporte-form.component.css'],
  standalone: false
})
export class TecnicoReporteFormComponent {
  readonly urgencias = ['', 'BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  isSubmitting = false;

  readonly form = this.formBuilder.nonNullable.group({
    descripcionReporte: ['', [Validators.required, Validators.minLength(10)]],
    urgenciaSugerida: [''],
    requiereMasTecnicos: [false],
    incidenciaResuelta: [false]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly reporteTecnicoService: ReporteTecnicoService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'tecnico.report.validationError'
      });
      return;
    }

    const currentUser = this.sessionService.getUser();
    const incidenciaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!currentUser || !incidenciaId) {
      return;
    }

    this.isSubmitting = true;

    this.reporteTecnicoService.create(incidenciaId, {
      idTecnico: currentUser.idUsuario,
      descripcionReporte: this.form.controls.descripcionReporte.value,
      urgenciaSugerida: this.form.controls.urgenciaSugerida.value,
      requiereMasTecnicos: this.form.controls.requiereMasTecnicos.value,
      incidenciaResuelta: this.form.controls.incidenciaResuelta.value
    }).subscribe({
      next: () => {
        this.toastService.show({
          id: 0,
          type: 'success',
          titleKey: 'toast.success.title',
          messageKey: 'tecnico.report.success'
        });
        this.router.navigate(['/tecnico/incidencias', incidenciaId]);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating technical report', error);
        this.isSubmitting = false;
        this.toastService.show({
          id: 0,
          type: 'error',
          titleKey: 'toast.error.title',
          messageKey: 'tecnico.report.error'
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
