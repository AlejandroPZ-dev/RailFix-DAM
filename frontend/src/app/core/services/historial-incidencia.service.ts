import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { HistorialIncidencia } from '../models/historial-incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialIncidenciaService {
  private readonly apiUrl = API_BASE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  getByIncidencia(incidenciaId: number): Observable<HistorialIncidencia[]> {
    return this.httpClient.get<HistorialIncidencia[]>(`${this.apiUrl}/incidencias/${incidenciaId}/historial`);
  }
}
