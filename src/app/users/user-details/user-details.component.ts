import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  currentUserData: any;
  pageCount: number = 0;
  isLoading!: boolean;
  userList: any[] = [];
  userInfo!: any;
  tweetList: any[] = [];
  followingList: any[] = [];
  followerList: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) {
    this.userId = this.route.snapshot.params['id'];
    const storedData = localStorage.getItem('user_info');
    if (storedData) {
      this.userInfo = JSON.parse(storedData);
    }

  }

  ngOnInit(): void {
    // this.currentUserData = this.requesterService.userDataSnapshot?.userData;
    // this.getUsers();
    this.getTweetsByUserId();
    this.getFollowingsByUserId();
    this.getFollowersByUserId();
  }

  getTweetsByUserId(): void {
    this.isLoading = true;

    this.userService.getTweetsByUserId(this.userId).subscribe({
      next: (res) => {
        this.tweetList = res.tweets;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }
  getFollowingsByUserId(): void {
    this.isLoading = true;

    this.userService.getFollowingsByUserId(this.userId).subscribe({
      next: (res) => {
        this.followingList = res.followings;
        this.isLoading = false;
        console.log('this.followingList', this.followingList);

      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }
  getFollowersByUserId(): void {
    this.isLoading = true;

    this.userService.getFollowersByUserId(this.userId).subscribe({
      next: (res) => {
        this.followerList = res.followers;
        this.isLoading = false;
        console.log('this.followerList', this.followerList);

      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }

  storeUser(user: any) {
    console.log('user', user);
    localStorage.setItem('user_info', JSON.stringify(user));
  }

  followUser(): void {
    this.userService.followUser(this.userInfo.id).subscribe({
      next: (res) => {
        this.snackbar.open(res.resp, "Close", {
          duration: 3000
        })

      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }

  unfollowUser(): void {
    this.userService.unfollowUser(this.userInfo.id).subscribe({
      next: (res) => {
        console.log('res',res);
        
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });

  }

  // getUsers(): void {
  //   this.isLoading = true;

  //   this.userService.getAllUsers(this.pageCount).subscribe({
  //     next: (res) => {
  //       this.userList = [...this.userList, ...res.users];

  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       console.log('Error:', err);
  //     },
  //   });
  // }

  // onScroll() {
  //   this.pageCount++;
  //   this.getUsers();
  // }
}
