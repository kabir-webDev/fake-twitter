import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const childrenRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tweets',
  },
  {
    path: 'tweets',
    loadChildren: () => import('./tweets/tweets.module').then((m) => m.TweetsModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('./error/error.module').then((m) => m.ErrorModule),
  // },
];
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: '',
    component: LayoutComponent,
    children: childrenRoutes,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
