import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  selector: 'forgot',
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnInit, OnDestroy {
  isLoading = false;
  forgotForm: FormGroup;
  submitted = false;

  private authStatusSub: Subscription;

  constructor(
      public authService: AuthService,
      private formBuilder: FormBuilder) {

      }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onForgot(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.forgotPassword(form.value.email);
  }
  get f() { return this.forgotForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.forgotForm.invalid) {
          return;
      }
      this.onForgot(this.forgotForm);
  }

  onReset() {
      this.submitted = false;
      this.forgotForm.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
