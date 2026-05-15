import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { Incidencia } from '../models/incidencia.model';

type CreateIncidenciaPayload = {
  lineaId: number;
  viaId: number;
  operarioCreadorId: number;
  puntoKilometrico: number;
  titulo: string;
  descripcion: string;
  urgencia: string;
  latitud?: number;
  longitud?: number;
  precisionGpsMetros?: number;
};

type UpdateEstadoPayload = {
  estado: string;
  idUsuario: number;
};

type UpdateUrgenciaPayload = {
  urgencia: string;
  idUsuario: number;
};

type UpdateDescripcionPayload = {
  descripcion: string;
  idUsuario: number;
};

type CerrarIncidenciaPayload = {
  idUsuario: number;
  comentario: string;
};

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private readonly apiUrl = `${API_BASE_URL}/incidencias`;
  private readonly incidenciasUpdatedSubject = new Subject<void>();
  readonly incidenciasUpdated$ = this.incidenciasUpdatedSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Incidencia[]> {
    return this.httpClient.get<Incidencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<Incidencia> {
    return this.httpClient.get<Incidencia>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateIncidenciaPayload): Observable<Incidencia> {
    return this.httpClient.post<Incidencia>(this.apiUrl, payload).pipe(
      tap(() => {
        this.incidenciasUpdatedSubject.next();
      })
    );
  }

  updateEstado(id: number, payload: UpdateEstadoPayload): Observable<Incidencia> {
    return this.httpClient.patch<Incidencia>(`${this.apiUrl}/${id}/estado`, payload).pipe(
      tap(() => {
        this.incidenciasUpdatedSubject.next();
      })
    );
  }

  updateUrgencia(id: number, payload: UpdateUrgenciaPayload): Observable<Incidencia> {
    return this.httpClient.patch<Incidencia>(`${this.apiUrl}/${id}/urgencia`, payload).pipe(
      tap(() => {
        this.incidenciasUpdatedSubject.next();
      })
    );
  }

  updateDescripcion(id: number, payload: UpdateDescripcionPayload): Observable<Incidencia> {
    return this.httpClient.patch<Incidencia>(`${this.apiUrl}/${id}/descripcion`, payload).pipe(
      tap(() => {
        this.incidenciasUpdatedSubject.next();
      })
    );
  }

  cerrar(id: number, payload: CerrarIncidenciaPayload): Observable<Incidencia> {
    return this.httpClient.patch<Incidencia>(`${this.apiUrl}/${id}/cerrar`, payload).pipe(
      tap(() => {
        this.incidenciasUpdatedSubject.next();
      })
    );
  }

  notifyUpdated(): void {
    this.incidenciasUpdatedSubject.next();
  }
}
