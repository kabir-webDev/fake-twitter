import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
    data: {
      title: 'Login',
      toolbarTitle: 'Login',
    }
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: {
      title: 'Sign up',
      toolbarTitle: 'Sign up',
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
