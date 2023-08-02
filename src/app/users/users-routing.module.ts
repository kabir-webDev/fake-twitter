import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full',
    data: {
      title: 'Users',
      toolbarTitle: 'Users List',
    },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    pathMatch: 'full',
    data: {
      title: 'User Details',
      toolbarTitle: 'Users Details',
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
