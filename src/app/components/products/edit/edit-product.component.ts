import { Component, OnInit, OnDestroy, Injector, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductsService } from '../products.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { BrandsService } from '../../brands/brands.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edit-product',
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"]
})
export class EditProductComponent implements OnInit, OnDestroy {
  isLoading = false;
  submitted = false;
  editProductForm: FormGroup;
  imagePreview: string;
  mode = "create";
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  brands$ = this.brandsService.getBrands().pipe(
    map(({ brands }) => brands)
  );
  constructor(
    @Inject('product') public product: Product,
    public productsService: ProductsService,
    public brandsService: BrandsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      description: new FormControl(this.product.description, { validators: [Validators.required] }),
      name: new FormControl(this.product.name, { validators: [Validators.required] }),
      price: new FormControl(this.product.price, { validators: [Validators.required] }),
      publish: new FormControl(this.product.publish),
      availableQuantity: new FormControl(this.product.availableQuantity, { validators: [Validators.required] }),
      available: new FormControl(this.product.available),
      shipping: new FormControl(this.product.shipping),
      featured: new FormControl(this.product.featured),
      brand: new FormControl(this.product.brand['_id'], { validators: [Validators.required] }),
      image: new FormControl(null)
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editProductForm.patchValue({ image: file });
    this.editProductForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      return;
    }
    this.productsService.editProduct(
      this.product._id,
      this.editProductForm.value.name,
      this.editProductForm.value.description,
      this.editProductForm.value.image,
      this.editProductForm.value.price,
      this.editProductForm.value.available,
      this.editProductForm.value.shipping,
      this.editProductForm.value.availableQuantity,
      this.editProductForm.value.publish,
      this.editProductForm.value.featured,
      this.editProductForm.value.brand
    );
  }

  get f() { return this.editProductForm.controls; }


  ngOnDestroy() {
  }

}
