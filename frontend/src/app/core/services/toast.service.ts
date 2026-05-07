import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ToastMessage } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  readonly toast$: Observable<ToastMessage | null> = this.toastSubject.asObservable();
  private nextId = 1;

  constructor(private readonly ngZone: NgZone) {}

  show(toast: ToastMessage): void {
    this.ngZone.run(() => {
      this.toastSubject.next({
        ...toast,
        id: this.nextId++
      });
    });
  }

  clear(): void {
    this.ngZone.run(() => {
      this.toastSubject.next(null);
    });
  }
}
