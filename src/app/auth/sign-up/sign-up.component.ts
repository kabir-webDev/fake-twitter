import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  loginForm: FormGroup; // Declare loginForm as FormGroup
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      username: this.loginForm.value.username,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    // this.loginService.login()
    this.loginService
      .signup(payload)
      .subscribe(
        (response) => {
          console.log('Signup successful!', response);
        },
        (error) => {
          console.error('Signup failed:', error);
        }
      );
  }
}
