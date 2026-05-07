import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthUser } from '../models/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private readonly httpClient: HttpClient) {}

  getTecnicos(): Observable<AuthUser[]> {
    const params = new HttpParams().set('rol', 'TECNICO');
    return this.httpClient.get<AuthUser[]>(this.apiUrl, { params });
  }
}

