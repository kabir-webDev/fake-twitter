import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm: FormGroup; // Declare loginForm as FormGroup
  submitted = false;
  visible: boolean = false;
  inputType: any = 'password';
  isSubmitting: boolean = false;
  isSubmittingSso: boolean = false;
  errMessage!: string;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService,private requester: RequesterService, private router: Router) {

    if (this.requester.isAuthenticated) {
      this.router.navigate(['/tweets']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isSubmitting = true;
    console.log(this.loginForm.value);
    
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login({email: this.loginForm.value.email, password: this.loginForm.value.password})
      .subscribe(
        (response) => {
          console.log('Login successful!', response);
          this.isSubmitting = false;
          this.router.navigate(['/tweets']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }

  submitForm(nextPage = '/jobs'): void {
    this.isSubmitting = true;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
    } else {
      this.inputType = 'text';
      this.visible = true;
    }
  }
}