import { Component } from '@angular/core';

import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-tecnico-dashboard',
  templateUrl: './tecnico-dashboard.component.html',
  styleUrls: ['./tecnico-dashboard.component.css'],
  standalone: false
})
export class TecnicoDashboardComponent {
  constructor(private readonly sessionService: SessionService) {}

  get userName(): string {
    return this.sessionService.getUser()?.nombre ?? '';
  }
}

