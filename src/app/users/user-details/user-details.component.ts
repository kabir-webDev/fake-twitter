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
  tweetsPageCount: number = 1;
  followingsPageCount: number = 1;
  followersPageCount: number = 1;
  activeTab: string = 'Tweets';
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
    this.getTweetsByUserId();
  }

  onTabChange(event: any) {
    this.activeTab = event.tab.textLabel;
    this.tweetsPageCount = 1;
    this.followingsPageCount = 1;
    this.followersPageCount = 1;
    this.tweetList = [];
    this.followingList = [];
    this.followerList = [];
    this.activeTab === 'Tweets' && this.getTweetsByUserId();
    this.activeTab === 'Followings' && this.getFollowingsByUserId();
    this.activeTab === 'Followers' && this.getFollowersByUserId();
  }

  getTweetsByUserId(): void {
    this.isLoading = true;

    this.userService.getTweetsByUserId(this.userId, this.tweetsPageCount).subscribe({
      next: (res) => {
        // this.tweetList = res.tweets;
        this.tweetList = [...this.tweetList, ...res.tweets];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  getFollowingsByUserId(): void {
    this.isLoading = true;

    this.userService.getFollowingsByUserId(this.userId, this.followingsPageCount).subscribe({
      next: (res) => {
        this.followingList = [...this.followingList, ...res.followings];
        this.isLoading = false;

      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  getFollowersByUserId(): void {
    this.isLoading = true;

    this.userService.getFollowersByUserId(this.userId, this.followersPageCount).subscribe({
      next: (res) => {
        this.followerList = [...this.followerList, ...res.followers];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  storeUser(user: any) {
    localStorage.setItem('user_info', JSON.stringify(user));
  }

  followUser(): void {
    this.userService.followUser(this.userInfo.id).subscribe({
      next: (res) => {
        this.snackbar.open(res.resp, "Close", {
          duration: 3000,
          panelClass: ['snackbar-dark'],
        })

      },
      error: (err) => {
        this.isLoading = false;
        this.snackbar.open(err, "Close", {
          duration: 3000,
          panelClass: ['snackbar-dark'],
        })
      },
    });
  }

  unfollowUser(): void {
    this.userService.unfollowUser(this.userInfo.id).subscribe({
      next: (res) => {

      },
      error: (err) => {
        this.isLoading = false;
      },
    });

  }

  onTweetScroll() {
    this.tweetsPageCount++;
    this.getTweetsByUserId();
  }
  onFollowingScroll() {
    this.followingsPageCount++;
    this.getFollowingsByUserId();
  }
  onFollowersScroll() {
    this.followersPageCount++;
    this.getFollowersByUserId();
  }
}
