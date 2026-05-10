import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { Linea } from '../models/linea.model';

@Injectable({
  providedIn: 'root'
})
export class LineaService {
  private readonly apiUrl = `${API_BASE_URL}/lineas`;

  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Linea[]> {
    return this.httpClient.get<Linea[]>(this.apiUrl);
  }
}
