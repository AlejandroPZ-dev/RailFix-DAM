import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdjuntosService } from '../../../../core/services/adjuntos.service';
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
  private static readonly MAX_FILES = 3;
  private static readonly MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  private static readonly MAX_LOCATION_ATTEMPTS = 3;
  private static readonly TARGET_ACCURACY_METERS = 50;

  lineas: Linea[] = [];
  vias: Via[] = [];
  selectedFiles: File[] = [];
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
    private readonly adjuntosService: AdjuntosService,
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

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    if (files.length > OperarioIncidenciaFormComponent.MAX_FILES) {
      this.selectedFiles = [];
      input.value = '';
      this.showError('operario.form.errors.maxFiles');
      return;
    }

    const hasInvalidType = files.some((file) => !OperarioIncidenciaFormComponent.ALLOWED_TYPES.includes(file.type));
    if (hasInvalidType) {
      this.selectedFiles = [];
      input.value = '';
      this.showError('operario.form.errors.invalidImageType');
      return;
    }

    const hasInvalidSize = files.some((file) => file.size > OperarioIncidenciaFormComponent.MAX_FILE_SIZE_BYTES);
    if (hasInvalidSize) {
      this.selectedFiles = [];
      input.value = '';
      this.showError('operario.form.errors.invalidImageSize');
      return;
    }

    this.selectedFiles = files;
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

    this.getCurrentLocation()
      .then((location) => {
        this.createIncidencia(currentUser.idUsuario, puntoKilometrico, location ?? undefined);
      })
      .catch((error: { messageKey: string }) => {
        this.toastService.show({
          id: 0,
          type: 'info',
          titleKey: 'toast.info.title',
          messageKey: error.messageKey
        });
        this.createIncidencia(currentUser.idUsuario, puntoKilometrico);
      });
  }

  private createIncidencia(
    operarioCreadorId: number,
    puntoKilometrico: number,
    location?: { latitud: number; longitud: number; precisionGpsMetros: number }
  ): void {
    const payload = {
      lineaId: Number(this.form.controls.lineaId.value),
      viaId: Number(this.form.controls.viaId.value),
      operarioCreadorId,
      puntoKilometrico,
      titulo: this.form.controls.titulo.value,
      descripcion: this.form.controls.descripcion.value,
      urgencia: this.form.controls.urgencia.value,
      ...(location ?? {})
    };

    this.incidenciaService.create({
      ...payload
    }).subscribe({
      next: (incidencia) => {
        if (this.selectedFiles.length === 0) {
          this.toastService.show({
            id: 0,
            type: 'success',
            titleKey: 'toast.success.title',
            messageKey: 'operario.form.success'
          });
          this.router.navigate(['/operario/incidencias']);
          return;
        }

        this.uploadAdjuntos(incidencia.id, operarioCreadorId);
      },
      error: (error) => {
        console.error('Error creating incident', error);
        this.isSubmitting = false;
        this.showError('operario.form.errors.createFailed');
      },
      complete: () => {
        if (this.selectedFiles.length === 0) {
          this.isSubmitting = false;
        }
      }
    });
  }

  private getCurrentLocation(): Promise<{ latitud: number; longitud: number; precisionGpsMetros: number } | null> {
    if (!window.isSecureContext) {
      return Promise.reject({ messageKey: 'operario.form.location.insecureContext' });
    }

    if (!navigator.geolocation) {
      return Promise.reject({ messageKey: 'operario.form.location.unsupported' });
    }

    return this.getBestAvailableLocation();
  }

  private async getBestAvailableLocation(): Promise<{ latitud: number; longitud: number; precisionGpsMetros: number } | null> {
    let bestLocation: { latitud: number; longitud: number; precisionGpsMetros: number } | null = null;

    for (let attempt = 0; attempt < OperarioIncidenciaFormComponent.MAX_LOCATION_ATTEMPTS; attempt += 1) {
      try {
        const location = await this.requestSingleLocation();
        if (!bestLocation || location.precisionGpsMetros < bestLocation.precisionGpsMetros) {
          bestLocation = location;
        }

        if (location.precisionGpsMetros <= OperarioIncidenciaFormComponent.TARGET_ACCURACY_METERS) {
          return location;
        }
      } catch (error: any) {
        if (error?.messageKey === 'operario.form.location.permissionDenied') {
          throw error;
        }
      }
    }

    if (bestLocation) {
      return bestLocation;
    }

    throw { messageKey: 'operario.form.location.unavailable' };
  }

  private requestSingleLocation(): Promise<{ latitud: number; longitud: number; precisionGpsMetros: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
            precisionGpsMetros: position.coords.accuracy
          });
        },
        (error) => {
          console.warn('Could not obtain browser geolocation', error);

          if (error.code === error.PERMISSION_DENIED) {
            reject({ messageKey: 'operario.form.location.permissionDenied' });
            return;
          }

          reject({ messageKey: 'operario.form.location.unavailable' });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  private uploadAdjuntos(idIncidencia: number, idUsuario: number): void {
    this.adjuntosService.uploadAdjuntos(idIncidencia, this.selectedFiles, idUsuario).subscribe({
      next: () => {
        this.toastService.show({
          id: 0,
          type: 'success',
          titleKey: 'toast.success.title',
          messageKey: this.selectedFiles.length === 1
            ? 'operario.form.attachments.uploadSuccessOne'
            : 'operario.form.attachments.uploadSuccessMany'
        });
        this.router.navigate(['/operario/incidencias']);
      },
      error: (error) => {
        console.error('Error uploading incident attachments', error);
        this.toastService.show({
          id: 0,
          type: 'info',
          titleKey: 'toast.info.title',
          messageKey: 'operario.form.attachments.uploadWarning'
        });
        this.router.navigate(['/operario/incidencias']);
      },
      complete: () => {
        this.isSubmitting = false;
      }
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
