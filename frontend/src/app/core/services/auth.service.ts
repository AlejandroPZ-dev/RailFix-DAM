import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthUser } from '../models/auth-user.model';

type LoginPayload = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private readonly httpClient: HttpClient) {}

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.httpClient.post<AuthUser>(`${this.apiUrl}/auth/login`, payload);
  }
}

