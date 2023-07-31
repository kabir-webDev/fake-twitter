import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm: FormGroup; // Declare loginForm as FormGroup
  submitted = false;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService) {
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
    console.log(this.loginForm.value);
    
    if (this.loginForm.invalid) {
      return;
    }

    // this.loginService.login({email: this.loginForm.value.email, password: this.loginForm.value.password})
    this.loginService.login({email: 'kabir.webdev@gmail.com', password: 'inthelangs175'})
      .subscribe(
        (response) => {
          console.log('Login successful!', response);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }
}