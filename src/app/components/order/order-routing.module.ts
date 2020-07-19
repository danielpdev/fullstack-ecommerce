import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrderComponent } from './main/order.component';
import { CartPageComponent } from './cart/cart-page.component';

const routes: Routes = [
  { path: "", component: OrderComponent },
  { path: "cart", component: CartPageComponent },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
