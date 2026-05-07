import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Asignacion } from '../models/asignacion.model';
import { TecnicoIncidenciaDetail } from '../models/tecnico-incidencia-detail.model';
import { TecnicoIncidencia } from '../models/tecnico-incidencia.model';
import { IncidenciaService } from './incidencia.service';

type CreateAsignacionPayload = {
  tecnicoIds: number[];
  idAdministrador: number;
};

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly incidenciaService: IncidenciaService
  ) {}

  getByIncidencia(incidenciaId: number): Observable<Asignacion[]> {
    return this.httpClient.get<Asignacion[]>(`${this.apiUrl}/incidencias/${incidenciaId}/asignaciones`);
  }

  create(incidenciaId: number, payload: CreateAsignacionPayload): Observable<Asignacion[]> {
    return this.httpClient.post<Asignacion[]>(`${this.apiUrl}/incidencias/${incidenciaId}/asignaciones`, payload).pipe(
      tap(() => {
        this.incidenciaService.notifyUpdated();
      })
    );
  }

  delete(incidenciaId: number, idAsignacion: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/incidencias/${incidenciaId}/asignaciones/${idAsignacion}`).pipe(
      tap(() => {
        this.incidenciaService.notifyUpdated();
      })
    );
  }

  getIncidenciasByTecnico(tecnicoId: number): Observable<TecnicoIncidencia[]> {
    return this.httpClient.get<TecnicoIncidencia[]>(`${this.apiUrl}/tecnicos/${tecnicoId}/incidencias`);
  }

  getIncidenciaDetailByTecnico(tecnicoId: number, incidenciaId: number): Observable<TecnicoIncidenciaDetail> {
    return this.httpClient.get<TecnicoIncidenciaDetail>(
      `${this.apiUrl}/tecnicos/${tecnicoId}/incidencias/${incidenciaId}`
    );
  }
}
