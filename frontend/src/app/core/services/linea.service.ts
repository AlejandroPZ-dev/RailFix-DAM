import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Linea } from '../models/linea.model';

@Injectable({
  providedIn: 'root'
})
export class LineaService {
  private readonly apiUrl = 'http://localhost:8080/api/lineas';

  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Linea[]> {
    return this.httpClient.get<Linea[]>(this.apiUrl);
  }
}

