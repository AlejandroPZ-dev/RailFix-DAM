import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

import { ToastMessage } from '../../../core/models/toast.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: false
})
export class ToastComponent implements OnInit, OnDestroy {
  readonly toast$: Observable<ToastMessage | null>;
  private activeToastId: number | null = null;

  private toastSubscription?: Subscription;
  private hideSubscription?: Subscription;

  constructor(private readonly toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toast$.subscribe((toast) => {
      this.activeToastId = toast?.id ?? null;
      this.hideSubscription?.unsubscribe();

      if (toast) {
        this.hideSubscription = timer(4000).subscribe(() => {
          if (this.activeToastId === toast.id) {
            this.close();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.toastSubscription?.unsubscribe();
    this.hideSubscription?.unsubscribe();
  }

  close(): void {
    this.toastService.clear();
  }
}
