import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavModule } from './components/app-nav/app-nav.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { TranslateModule } from './components/translate/translate.module';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from './shared/toaster/toaster.service';


@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    NotFoundComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppNavModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [
    CookieService,
    ToasterService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
