import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../config/api.config';
import { AuthUser } from '../models/auth-user.model';

type LoginPayload = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = API_BASE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.httpClient.post<AuthUser>(`${this.apiUrl}/auth/login`, payload);
  }
}
