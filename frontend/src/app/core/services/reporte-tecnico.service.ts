import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { ReporteTecnico } from '../models/reporte-tecnico.model';

type CreateReportePayload = {
  idTecnico: number;
  descripcionReporte: string;
  urgenciaSugerida: string;
  requiereMasTecnicos: boolean;
  incidenciaResuelta: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ReporteTecnicoService {
  private readonly apiUrl = API_BASE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  getAll(filters?: {
    idIncidencia?: number | null;
    idTecnico?: number | null;
    estadoIncidencia?: string | null;
    fechaDesde?: string | null;
    fechaHasta?: string | null;
    incidenciaResuelta?: string | null;
  }): Observable<ReporteTecnico[]> {
    let params = new HttpParams();

    if (filters?.idIncidencia) {
      params = params.set('idIncidencia', filters.idIncidencia);
    }

    if (filters?.idTecnico) {
      params = params.set('idTecnico', filters.idTecnico);
    }

    if (filters?.estadoIncidencia) {
      params = params.set('estadoIncidencia', filters.estadoIncidencia);
    }

    if (filters?.fechaDesde) {
      params = params.set('fechaDesde', filters.fechaDesde);
    }

    if (filters?.fechaHasta) {
      params = params.set('fechaHasta', filters.fechaHasta);
    }

    if (filters?.incidenciaResuelta) {
      params = params.set('incidenciaResuelta', filters.incidenciaResuelta);
    }

    return this.httpClient.get<ReporteTecnico[]>(`${this.apiUrl}/reportes`, { params });
  }

  getByIncidencia(incidenciaId: number): Observable<ReporteTecnico[]> {
    return this.httpClient.get<ReporteTecnico[]>(`${this.apiUrl}/incidencias/${incidenciaId}/reportes`);
  }

  getByTecnico(tecnicoId: number): Observable<ReporteTecnico[]> {
    return this.httpClient.get<ReporteTecnico[]>(`${this.apiUrl}/tecnicos/${tecnicoId}/reportes`);
  }

  getByTecnicoAndIncidencia(tecnicoId: number, incidenciaId: number): Observable<ReporteTecnico[]> {
    return this.httpClient.get<ReporteTecnico[]>(
      `${this.apiUrl}/tecnicos/${tecnicoId}/incidencias/${incidenciaId}/reportes`
    );
  }

  create(incidenciaId: number, payload: CreateReportePayload): Observable<ReporteTecnico> {
    return this.httpClient.post<ReporteTecnico>(`${this.apiUrl}/incidencias/${incidenciaId}/reportes`, payload);
  }
}
