import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TweetListComponent,
    pathMatch: 'full',
    data: {
      title: 'Tweets',
      toolbarTitle: 'Timeline',
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TweetsRoutingModule { }
