import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  selector: 'reset',
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.scss"]
})
export class ResetComponent implements OnInit, OnDestroy {
  isLoading = false;
  resetForm: FormGroup;
  submitted = false;

  private authStatusSub: Subscription;

  constructor(
      public authService: AuthService,
      private formBuilder: FormBuilder) {

      }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      resetKey: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onReset(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.resetPassword(form.value.resetKey, form.value.password);
  }
  get f() { return this.resetForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.resetForm.invalid) {
          return;
      }
      this.onReset(this.resetForm);
  }

  onResetForm() {
      this.submitted = false;
      this.resetForm.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
