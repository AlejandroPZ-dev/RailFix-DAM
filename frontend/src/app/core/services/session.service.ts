import { Injectable } from '@angular/core';

import { AuthUser } from '../models/auth-user.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentRole: Role = Role.OPERARIO;
  private currentUser: AuthUser | null = null;

  constructor() {
    // Temporary approach for this MVP: persist the logged-in user in localStorage
    // so frontend routes can keep the selected role without a real backend session.
    const storedUser = localStorage.getItem('railfix-user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as AuthUser;
      this.currentRole = this.currentUser.rol;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getRole(): Role {
    return this.currentRole;
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }

  setUser(user: AuthUser): void {
    this.currentUser = user;
    this.currentRole = user.rol;
    localStorage.setItem('railfix-user', JSON.stringify(user));
  }

  clear(): void {
    this.currentUser = null;
    this.currentRole = Role.OPERARIO;
    localStorage.removeItem('railfix-user');
  }
}
