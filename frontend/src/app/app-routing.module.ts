import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { HomeRedirectGuard } from './core/guards/home-redirect.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.model';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((module) => module.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [HomeRedirectGuard],
        pathMatch: 'full',
        children: []
      },
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: {
          roles: [Role.ADMINISTRADOR]
        },
        loadChildren: () =>
          import('./features/admin/admin.module').then((module) => module.AdminModule)
      },
      {
        path: 'operario',
        canActivate: [RoleGuard],
        data: {
          roles: [Role.OPERARIO]
        },
        loadChildren: () =>
          import('./features/operario/operario.module').then((module) => module.OperarioModule)
      },
      {
        path: 'tecnico',
        canActivate: [RoleGuard],
        data: {
          roles: [Role.TECNICO]
        },
        loadChildren: () =>
          import('./features/tecnico/tecnico.module').then((module) => module.TecnicoModule)
      },
      {
        path: 'incidencias',
        loadChildren: () =>
          import('./features/incidencias/incidencias.module').then(
            (module) => module.IncidenciasModule
          ),
        canActivate: [RoleGuard],
        data: {
          roles: [Role.OPERARIO, Role.ADMINISTRADOR, Role.TECNICO]
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
