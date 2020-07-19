import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProductComponent } from './add/add-product.component'
import { ManageProductsComponent } from './manage/manage.component';
import { EditProductComponent } from './edit/edit-product.component';

const routes: Routes = [
  { path: "add", component: AddProductComponent },
  { path: "manage", component: ManageProductsComponent },
  { path: "edit/:id", component: EditProductComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
