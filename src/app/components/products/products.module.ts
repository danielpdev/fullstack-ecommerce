import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from './../../shared/shared.module';
import { AddProductComponent } from './add/add-product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { ErrorInterceptor } from 'src/app/interceptors/error.interceptor';
import { ManageProductsComponent } from './manage/manage.component';
import { EditProductComponent } from './edit/edit-product.component';

@NgModule({
  declarations: [
    AddProductComponent,
    ManageProductsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    RouterModule,
    AuthModule
  ],
  exports: [
    AddProductComponent,
    ManageProductsComponent,
    EditProductComponent
  ],
  entryComponents: [EditProductComponent],
  providers: [
    ProductsService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
})
export class ProductsModule { }
