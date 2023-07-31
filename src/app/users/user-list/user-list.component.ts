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
  constructor(
    private requesterService: RequesterService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUserData = this.requesterService.userDataSnapshot?.userData;
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log('User Response:', res);

        // this.dataSource = new MatTableDataSource( this.userList || []);
        // this.dataSource = this.userList;
        // this.ref.detectChanges();
        // this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log('Error:', err);

        // this.showData = false;
        // this.isLoading = false;
        // this.snackbar.open(
        //   err?.error?.message || 'Something went wrong on fetching user!',
        //   'Close',
        //   { duration: 5000, panelClass: ['snackbar-dark'] }
        // );
      },
    });
  }
}
