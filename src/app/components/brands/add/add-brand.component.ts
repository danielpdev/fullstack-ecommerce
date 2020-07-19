import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Brand } from '../models/brand';
import { BrandsService } from '../brands.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'add-brand',
  templateUrl: "./add-brand.component.html",
  styleUrls: ["./add-brand.component.scss"]
})
export class AddBrandComponent implements OnInit, OnDestroy {
  brand: Brand;
  isLoading = false;
  submitted = false;
  addBrandForm: FormGroup;
  imagePreview: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  private paramMapSubscription: Subscription

  constructor(
    public brandsService: BrandsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.addBrandForm = this.formBuilder.group({
      description: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSaveBrand() {
    this.submitted = true;

    if (this.addBrandForm.invalid) {
      return;
    }
    this.brandsService.addBrand(
      this.addBrandForm.value.name,
      this.addBrandForm.value.description,
    );
  }

  get f() { return this.addBrandForm.controls; }


  ngOnDestroy() {
  }

}
