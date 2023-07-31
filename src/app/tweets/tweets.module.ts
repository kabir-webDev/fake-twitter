import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TweetsRoutingModule } from './tweets-routing.module';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { TweetFormComponent } from './tweet-form/tweet-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TweetListComponent,
    TweetFormComponent
  ],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    FormsModule
  ],
  
})
export class TweetsModule { }
