import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthLoadGuard } from './components/auth/auth-load.guard';


const routes: Routes = [
  {
    path: '',
    component: MainBodyComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingComponent
      },
      {
        path: "auth", loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: "order", loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule)
      },
      {
        path: "products", canLoad: [AuthLoadGuard], loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: "brands", canLoad: [AuthLoadGuard], loadChildren: () => import('./components/brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
