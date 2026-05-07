import { Component } from '@angular/core';

import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-operario-dashboard',
  templateUrl: './operario-dashboard.component.html',
  styleUrls: ['./operario-dashboard.component.css'],
  standalone: false
})
export class OperarioDashboardComponent {
  constructor(private readonly sessionService: SessionService) {}

  get userName(): string {
    return this.sessionService.getUser()?.nombre ?? '';
  }
}

