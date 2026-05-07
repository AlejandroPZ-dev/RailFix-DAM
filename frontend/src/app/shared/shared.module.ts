import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutComponent } from './components/layout/layout.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [LayoutComponent, ToastComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    LayoutComponent,
    ToastComponent
  ]
})
export class SharedModule {}
