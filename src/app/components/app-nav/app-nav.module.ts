import { NgModule } from '@angular/core';
import { AppNavComponent } from './app-nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    AppNavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AuthModule
  ],
  exports: [
      AppNavComponent,
  ],
  providers: [],
})
export class AppNavModule { }
