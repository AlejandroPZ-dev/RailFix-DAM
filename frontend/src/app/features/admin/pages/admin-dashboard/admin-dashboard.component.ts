import { Component } from '@angular/core';

import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: false
})
export class AdminDashboardComponent {
  constructor(private readonly sessionService: SessionService) {}

  get userName(): string {
    return this.sessionService.getUser()?.nombre ?? '';
  }
}

