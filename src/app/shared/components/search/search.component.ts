import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequesterService } from '../../services/requester.service';
import { UserService } from 'src/app/users/user.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  currentUserData: any;
  isFocused!: boolean;
  isLoading!: boolean;
  userList = [];
  constructor(
    private searchUserService: SearchService
  ) { }

  ngOnInit(): void {
  }

  getUsers(): void {

  }
  searchQuery: string = '';

  onInputChange() {
    if (this.searchQuery.length > 2) {
      this.isLoading = true;
      this.searchUserService.searchUser({ token: this.searchQuery }).subscribe({
        next: (res) => {
          this.userList = res.search_results;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    }else{
      this.userList = [];
    }
  }

  onSearch() {
    if (this.searchQuery.length > 2) {
      this.isLoading = true;
      this.searchUserService.searchUser({ token: this.searchQuery }).subscribe({
        next: (res) => {
          this.userList = res.search_results;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    }else{
      this.userList = [];
    }
  }

  onClear() {
    this.searchQuery = '';
    this.userList = [];
  }

  onBlur() {
    if (!this.searchQuery.trim()) {
      this.onClear();
    }
  }
  onFocus() {
    this.isFocused = true;
  }
  storeUser(user:any){
    localStorage.setItem('user_info',JSON.stringify(user));
  }
}