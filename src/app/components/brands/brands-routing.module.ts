import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddBrandComponent } from './add/add-brand.component';
import { EditBrandComponent } from './edit/edit-brand.component';

const routes: Routes = [
  { path: "add", component: AddBrandComponent },
  { path: "edit/:id", component: EditBrandComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BrandsRoutingModule {}
