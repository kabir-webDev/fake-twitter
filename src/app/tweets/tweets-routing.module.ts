import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetListComponent } from './tweet-list/tweet-list.component';

const routes: Routes = [
  {
    path: '',
    component: TweetListComponent,
    pathMatch: 'full',
    data: {
      title: 'Tweets',
      toolbarTitle: 'Fake Twitter',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TweetsRoutingModule { }
