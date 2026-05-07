import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Role } from '../models/role.model';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const allowedRoles = (route.data['roles'] as Role[] | undefined) ?? [];
    const currentUser = this.sessionService.getUser();
    const currentRole = this.sessionService.getRole();

    if (currentUser && (allowedRoles.length === 0 || allowedRoles.includes(currentRole))) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
