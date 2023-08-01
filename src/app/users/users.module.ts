import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserDetailsComponent } from './user-details/user-details.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
  
    UserListComponent,
       UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatIconModule,
    InfiniteScrollModule,
    MatTabsModule
  ]
})
export class UsersModule { }
