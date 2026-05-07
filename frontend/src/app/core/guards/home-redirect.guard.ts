import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Role } from '../models/role.model';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRedirectGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const role = this.sessionService.getRole();

    if (role === Role.OPERARIO) {
      this.router.navigate(['/operario/dashboard']);
      return false;
    }

    if (role === Role.ADMINISTRADOR) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }

    if (role === Role.TECNICO) {
      this.router.navigate(['/tecnico/dashboard']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

