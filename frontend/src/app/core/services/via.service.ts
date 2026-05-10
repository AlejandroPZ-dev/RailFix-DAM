import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { Via } from '../models/via.model';

@Injectable({
  providedIn: 'root'
})
export class ViaService {
  private readonly apiUrl = `${API_BASE_URL}/vias`;

  constructor(private readonly httpClient: HttpClient) {}

  getByLineaId(lineaId: number): Observable<Via[]> {
    const params = new HttpParams().set('lineaId', lineaId);
    return this.httpClient.get<Via[]>(this.apiUrl, { params });
  }
}
