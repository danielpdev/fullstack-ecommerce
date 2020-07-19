import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'signup',
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  registerForm: FormGroup;
  submitted = false;

  private authStatusSub: Subscription;

  constructor(
      public authService: AuthService,
      private formBuilder: FormBuilder) {

      }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        emailConfirmation: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
    }, {
        validators: [ 
            MustMatch('password', 'confirmPassword'),
            MustMatch('email', 'emailConfirmation')
        ]
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
      this.onSignup(this.registerForm);
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
