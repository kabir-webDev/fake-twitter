import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RequesterService } from '../services/requester.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private requester: RequesterService, private router: Router, private snackbar: MatSnackBar) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('this.requester?.isAuthenticated', this.requester?.isAuthenticated);

    if (!this.requester?.isAuthenticated) {
      this.requester.logout();
      this.router.navigate(['/auth/login']);
      this.snackbar.open("You are not permitted to access this resources!", "Close", {
        duration: 80000
      })
      return false;
    } else {
      return true;
    }
  }

}
