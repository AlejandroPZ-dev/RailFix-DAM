import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '../../../core/models/role.model';
import { SessionService } from '../../../core/services/session.service';

type NavigationItem = {
  labelKey: string;
  path: string;
  roles: Role[];
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: false
})
export class LayoutComponent {
  readonly navigationItems: NavigationItem[] = [
    {
      labelKey: 'nav.operarioDashboard',
      path: '/operario/dashboard',
      roles: [Role.OPERARIO]
    },
    {
      labelKey: 'nav.operarioIncidencias',
      path: '/operario/incidencias',
      roles: [Role.OPERARIO]
    },
    {
      labelKey: 'nav.operarioNuevaIncidencia',
      path: '/operario/incidencias/nueva',
      roles: [Role.OPERARIO]
    },
    {
      labelKey: 'nav.adminDashboard',
      path: '/admin/dashboard',
      roles: [Role.ADMINISTRADOR]
    },
    {
      labelKey: 'nav.adminIncidencias',
      path: '/admin/incidencias',
      roles: [Role.ADMINISTRADOR]
    },
    {
      labelKey: 'nav.adminReportes',
      path: '/admin/reportes',
      roles: [Role.ADMINISTRADOR]
    },
    {
      labelKey: 'nav.tecnicoDashboard',
      path: '/tecnico/dashboard',
      roles: [Role.TECNICO]
    },
    {
      labelKey: 'nav.tecnicoIncidencias',
      path: '/tecnico/incidencias',
      roles: [Role.TECNICO]
    }
  ];

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  get currentRole(): Role {
    return this.sessionService.getRole();
  }

  isVisibleForRole(item: NavigationItem): boolean {
    return item.roles.includes(this.currentRole);
  }

  logout(): void {
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }
}
