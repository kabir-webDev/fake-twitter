import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  currentUserData: any;
  pageCount: number = 0;
  isLoading!: boolean;
  userList: any[] = []; // Initialize userList as an empty array
  constructor(
    private requesterService: RequesterService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.currentUserData = this.requesterService.userDataSnapshot?.userData;
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers(this.pageCount).subscribe({
      next: (res) => {
        this.userList = [...this.userList, ...res.users];

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }
  storeUser(user:any){
    console.log('user',user);
    localStorage.setItem('user_info',JSON.stringify(user));
  }
  onScroll() {
    this.pageCount++;
    this.getUsers();
  }
}
