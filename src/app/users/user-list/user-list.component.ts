import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  currentUserData: any;
  pageCount: number = 1;
  isLoading!: boolean;
  userList: any[] = [];
  constructor(
    private requesterService: RequesterService,
    private userService: UserService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
        this.snackbar.open(err, "Close", {
          duration: 3000,
        })
      },
    });
  }
  storeUser(user: any) {
    localStorage.setItem('user_info', JSON.stringify(user));
  }
  onScroll() {
    this.pageCount++;
    this.getUsers();
  }
}
