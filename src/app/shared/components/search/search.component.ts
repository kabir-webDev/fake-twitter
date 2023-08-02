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
    private requesterService: RequesterService,
    private searchUserService: SearchService
  ) { }

  ngOnInit(): void {
    // this.currentUserData = this.requesterService.userDataSnapshot?.userData;
    // this.getUsers();
  }

  getUsers(): void {

  }
  searchQuery: string = '';

  onInputChange() {
    if (this.searchQuery.length > 2) {
      this.isLoading = true;
      this.searchUserService.searchUser({ token: this.searchQuery }).subscribe({
        next: (res) => {
          console.log('Search Response:', res);
          this.userList = res.search_results;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.log('Error:', err);
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
          console.log('Search Response:', this.userList);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.log('Error:', err);
        },
      });
    }else{
      this.userList = [];
    }
  }

  onClear() {
    console.log('Searching for:', this.searchQuery);
    this.searchQuery = '';
    this.userList = [];
  }

  onBlur() {
    if (!this.searchQuery.trim()) {
      this.onClear();
    }
  }
  onFocus() {
    // Perform any actions when the input gains focus
    this.isFocused = true;
    console.log('Input focused');
  }
  storeUser(user:any){
    // console.log('user',user);
    localStorage.setItem('user_info',JSON.stringify(user));
  }
}