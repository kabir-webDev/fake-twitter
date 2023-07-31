import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email!: string;
  password!: string;

  constructor(private loginService: AuthService) {}

  onSubmit() {
    // Call the login service here
    this.loginService.login({email:this.email, password:this.password})
      .subscribe(
        (response) => {
          // Handle successful login (e.g., redirect to a new page)
          console.log('Login successful!');
        },
        (error) => {
          // Handle login error (e.g., show an error message)
          console.error('Login failed:', error);
        }
      );
  }
}