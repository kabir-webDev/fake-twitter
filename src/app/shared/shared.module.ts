import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserCardComponent } from './components/user-card/user-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SearchComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    RouterModule
  ],
  exports: [SearchComponent, UserCardComponent]
})
export class SharedModule { }
