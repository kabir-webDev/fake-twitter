import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  loginForm: FormGroup; // Declare loginForm as FormGroup
  submitted = false;
  visible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router
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

    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      username: this.loginForm.value.username,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.loginService
      .signup(payload)
      .subscribe(
        (response) => {
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Signup failed:', error);
        }
      );
  }
}
