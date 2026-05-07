import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HistorialIncidencia } from '../models/historial-incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialIncidenciaService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private readonly httpClient: HttpClient) {}

  getByIncidencia(incidenciaId: number): Observable<HistorialIncidencia[]> {
    return this.httpClient.get<HistorialIncidencia[]>(`${this.apiUrl}/incidencias/${incidenciaId}/historial`);
  }
}
