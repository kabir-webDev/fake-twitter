import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user: any;
  @Input() tab: any;
  isLoading!: boolean;
  isMyProfile!:boolean;

  constructor(
    private snackbar: MatSnackBar,
    private profile: ProfileService,
    private router: Router
    ) {
      if(this.router.url.slice(1)==='my-profile'){
        this.isMyProfile = true;
      }
    }
  storeUser(user: any) {
    console.log('user', user);
    localStorage.setItem('user_info', JSON.stringify(user));
  }
  unfollowUser(): void {
    this.profile.unfollowUser(this.user.id).subscribe({
      next: (res) => {
        console.log('res', res);
        this.snackbar.open(res.resp, "Close", {
          duration: 4000
        })

      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      },
    });
  }
}
