import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductsService } from '../products.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { BrandsService } from '../../brands/brands.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'add-product',
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit, OnDestroy {
  product: Product;
  isLoading = false;
  submitted = false;
  addProductForm: FormGroup;
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
    public productsService: ProductsService,
    public brandsService: BrandsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {

    this.addProductForm = this.formBuilder.group({
      description: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      publish: new FormControl(null),
      availableQuantity: new FormControl(null, { validators: [Validators.required] }),
      available: new FormControl(null),
      shipping: new FormControl(null),
      featured: new FormControl(null),
      brand: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addProductForm.patchValue({ image: file });
    this.addProductForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    this.submitted = true;

    if (this.addProductForm.invalid) {
      return;
    }

    this.productsService.addProduct(
      this.addProductForm.value.name,
      this.addProductForm.value.description,
      this.addProductForm.value.image,
      this.addProductForm.value.price,
      this.addProductForm.value.available,
      this.addProductForm.value.shipping,
      this.addProductForm.value.availableQuantity,
      this.addProductForm.value.publish,
      this.addProductForm.value.featured,
      this.addProductForm.value.brand
    );
  }

  get f() { return this.addProductForm.controls; }


  ngOnDestroy() {
  }

}
