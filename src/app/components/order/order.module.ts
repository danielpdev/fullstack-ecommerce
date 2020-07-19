import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrderComponent } from './main/order.component';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartPageComponent } from './cart/cart-page.component';

@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        SharedModule
    ],
    declarations: [
        OrderComponent,
        CartPageComponent
    ],
    exports: [
        OrderComponent,
        CartPageComponent
    ]
})
export class OrderModule { }
