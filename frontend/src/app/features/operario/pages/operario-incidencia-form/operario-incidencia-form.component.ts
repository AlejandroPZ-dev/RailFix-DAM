import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Linea } from '../../../../core/models/linea.model';
import { Via } from '../../../../core/models/via.model';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import { LineaService } from '../../../../core/services/linea.service';
import { SessionService } from '../../../../core/services/session.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ViaService } from '../../../../core/services/via.service';

@Component({
  selector: 'app-operario-incidencia-form',
  templateUrl: './operario-incidencia-form.component.html',
  styleUrls: ['./operario-incidencia-form.component.css'],
  standalone: false
})
export class OperarioIncidenciaFormComponent implements OnInit {
  lineas: Linea[] = [];
  vias: Via[] = [];
  isSubmitting = false;
  readonly urgencias = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];

  readonly form = this.formBuilder.nonNullable.group({
    lineaId: [0, [Validators.required, Validators.min(1)]],
    viaId: [0, [Validators.required, Validators.min(1)]],
    puntoKilometrico: [0, [Validators.required]],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    urgencia: ['', Validators.required]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly lineaService: LineaService,
    private readonly viaService: ViaService,
    private readonly incidenciaService: IncidenciaService,
    private readonly sessionService: SessionService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.lineaService.getAll().subscribe((lineas) => {
      this.lineas = lineas;
    });

    this.form.controls.lineaId.valueChanges.subscribe((lineaId) => {
      this.form.controls.viaId.setValue(0);
      this.vias = [];

      if (lineaId > 0) {
        this.viaService.getByLineaId(lineaId).subscribe((vias) => {
          this.vias = vias.filter((via) => via.activa);
        });
      }
    });
  }

  get selectedLinea(): Linea | undefined {
    return this.lineas.find((linea) => linea.id === Number(this.form.controls.lineaId.value));
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'operario.form.errors.invalidForm'
      });
      return;
    }

    if (!this.selectedLinea) {
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'operario.form.errors.invalidLine'
      });
      return;
    }

    const puntoKilometrico = Number(this.form.controls.puntoKilometrico.value);
    if (
      puntoKilometrico < this.selectedLinea.pkInicial
      || puntoKilometrico > this.selectedLinea.pkFinal
    ) {
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'operario.form.errors.pkOutOfRange'
      });
      return;
    }

    const currentUser = this.sessionService.getUser();
    if (!currentUser) {
      return;
    }

    this.isSubmitting = true;

    this.incidenciaService.create({
      lineaId: Number(this.form.controls.lineaId.value),
      viaId: Number(this.form.controls.viaId.value),
      operarioCreadorId: currentUser.idUsuario,
      puntoKilometrico,
      titulo: this.form.controls.titulo.value,
      descripcion: this.form.controls.descripcion.value,
      urgencia: this.form.controls.urgencia.value
    }).subscribe({
      next: () => {
        this.toastService.show({
          id: 0,
          type: 'success',
          titleKey: 'toast.success.title',
          messageKey: 'operario.form.success'
        });
        this.router.navigate(['/operario/incidencias']);
      },
      error: () => {
        this.isSubmitting = false;
        this.toastService.show({
          id: 0,
          type: 'error',
          titleKey: 'toast.error.title',
          messageKey: 'operario.form.errors.createFailed'
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
