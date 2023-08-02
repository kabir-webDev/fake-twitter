import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileInfoComponent  implements OnInit {
  userId!: number;
  currentUserData: any;
  pageCount: number = 0;
  isLoading!: boolean;
  userList: any[] = [];
  userInfo!: any;
  tweetList: any[] =[];
  followingList: any[] =[];
  followerList: any[] =[];
  myInfo: any;
  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private profile: ProfileService
  ) {
    this.userId = this.route.snapshot.params['id'];
    const storedData = localStorage.getItem('user_info');
    if (storedData) {
      this.userInfo = JSON.parse(storedData);
    }
    const myData = localStorage.getItem('access_token');
    if (myData) {
      this.myInfo = jwtDecode(myData);
    }
    console.log('this.myInfo',this.myInfo.id);
    
    

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

    this.profile.getTweetsByUserId(this.myInfo.id).subscribe({
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

    this.profile.getFollowingsByUserId(this.myInfo.id).subscribe({
      next: (res) => {
        this.followingList = res.followings;
        this.isLoading = false;
        console.log('this.followingList',this.followingList);
        
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }
  getFollowersByUserId(): void {
    this.isLoading = true;

    this.profile.getFollowersByUserId(this.myInfo.id).subscribe({
      next: (res) => {
        this.followerList = res.followers;
        this.isLoading = false;
        console.log('this.followerList',this.followerList);
        
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }


  unfollowUser(): void {
    this.profile.unfollowUser(this.userInfo.id).subscribe({
      next: (res) => {
        console.log('res',res);
        
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

  // getUsers(): void {
  //   this.isLoading = true;

  //   this.profile.getAllUsers(this.pageCount).subscribe({
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
