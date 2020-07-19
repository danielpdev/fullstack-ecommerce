import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { AddBrandComponent } from './add/add-brand.component';
import { EditBrandComponent } from './edit/edit-brand.component';
import { BrandsService } from './brands.service';
import { BrandsRoutingModule } from './brands-routing.module';

@NgModule({
  declarations: [
    AddBrandComponent,
    EditBrandComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    BrandsRoutingModule,
    AuthModule
  ],
  exports: [
    AddBrandComponent,
    EditBrandComponent
  ],
  entryComponents: [EditBrandComponent],
  providers: [
    BrandsService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class BrandsModule { }
