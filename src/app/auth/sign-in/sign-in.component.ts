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
  isLoading: boolean = false;
  isLoadingSso: boolean = false;
  errMessage!: string;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService,private requester: RequesterService, private router: Router) {

    if (this.requester.isAuthenticated) {
      this.router.navigate(['/timeline']);
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
    this.isLoading = true;
    
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login({email: this.loginForm.value.email, password: this.loginForm.value.password})
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/timeline']);
        },
        (error) => {
          this.isLoading = false;
          console.error('Login failed:', error);
        }
      );
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