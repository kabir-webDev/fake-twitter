import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileInfoComponent,
    pathMatch: 'full',
    data: {
      title: 'Profile',
      toolbarTitle: 'Fake Twitter',
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
