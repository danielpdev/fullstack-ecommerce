import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  toasts: string[] = [];
  toasts$ = new Subject();

  show(text: string, options: any = {}) {
    this.toasts = [...this.toasts, { text, ...options }];
    this.toasts$.next(this.toasts);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toasts$.next(this.toasts);
  }
}