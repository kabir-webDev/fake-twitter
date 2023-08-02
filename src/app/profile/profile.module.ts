import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersRoutingModule } from '../users/users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UsersRoutingModule,
    SharedModule,
    MatIconModule,
    InfiniteScrollModule,
    MatTabsModule
  ]
})
export class ProfileModule { }
