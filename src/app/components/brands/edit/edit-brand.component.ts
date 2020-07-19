import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Brand } from '../models/brand';
import { BrandsService } from '../brands.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edit-brand',
  templateUrl: "./edit-brand.component.html",
  styleUrls: ["./edit-brand.component.scss"]
})
export class EditBrandComponent implements OnInit, OnDestroy {
  isLoading = false;
  submitted = false;
  editBrandForm: FormGroup;
  imagePreview: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  private paramMapSubscription: Subscription

  constructor(
    @Inject('brand') public brand: Brand,
    public brandsService: BrandsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.editBrandForm = this.formBuilder.group({
      description: new FormControl(this.brand.description, { validators: [Validators.required] }),
      name: new FormControl(this.brand.name, { validators: [Validators.required] }),
    });
  }

  onSaveBrand() {
    this.submitted = true;

    if (this.editBrandForm.invalid) {
      return;
    }
    this.brandsService.editBrand(
      this.brand._id,
      this.editBrandForm.value.name,
      this.editBrandForm.value.description,
    );
  }

  get f() { return this.editBrandForm.controls; }


  ngOnDestroy() {
  }

}
