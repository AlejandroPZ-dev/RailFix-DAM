import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { Role } from '../../core/models/role.model';
import { SessionService } from '../../core/services/session.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  isSubmitting = false;
  readonly languages = ['es', 'en'];

  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly languageService: LanguageService,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {
  }

  get currentLanguage(): string {
    return this.languageService.currentLanguage;
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  submit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.toastService.show({
        id: 0,
        type: 'error',
        titleKey: 'toast.error.title',
        messageKey: 'login.error.requiredFields'
      });
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.getRawValue())
      .pipe(finalize(() => {
        this.isSubmitting = false;
      }))
      .subscribe({
        next: (user) => {
          this.sessionService.setUser(user);
          this.router.navigate([this.getRedirectPath(user.rol)]);
        },
        error: (error: HttpErrorResponse) => {
          const messageKey = error.status === 401
            ? 'login.error.invalidCredentials'
            : 'login.error.serverUnavailable';

          this.toastService.show({
            id: 0,
            type: 'error',
            titleKey: 'toast.error.title',
            messageKey
          });
        }
      });
  }

  private getRedirectPath(role: Role): string {
    if (role === Role.OPERARIO) {
      return '/operario/dashboard';
    }

    if (role === Role.ADMINISTRADOR) {
      return '/admin/dashboard';
    }

    if (role === Role.TECNICO) {
      return '/tecnico/dashboard';
    }

    return '/incidencias';
  }
}
