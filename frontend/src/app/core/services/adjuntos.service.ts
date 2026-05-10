import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { AdjuntoIncidencia } from '../models/adjunto-incidencia.model';

@Injectable({
  providedIn: 'root'
})
export class AdjuntosService {
  private readonly apiUrl = API_BASE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  uploadAdjuntos(idIncidencia: number, files: File[], idUsuario: number): Observable<AdjuntoIncidencia[]> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('idUsuario', String(idUsuario));

    return this.httpClient.post<AdjuntoIncidencia[]>(`${this.apiUrl}/incidencias/${idIncidencia}/adjuntos`, formData);
  }

  getAdjuntosByIncidencia(idIncidencia: number): Observable<AdjuntoIncidencia[]> {
    return this.httpClient.get<AdjuntoIncidencia[]>(`${this.apiUrl}/incidencias/${idIncidencia}/adjuntos`);
  }

  getAdjuntoDownloadUrl(idAdjunto: number): string {
    return `${this.apiUrl}/adjuntos/${idAdjunto}/download`;
  }
}
