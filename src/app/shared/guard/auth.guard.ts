import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RequesterService } from '../services/requester.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private requester: RequesterService, private router: Router, private snackbar: MatSnackBar) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.requester?.isAuthenticated) {      
      this.router.navigate(['/auth/login']);
      return false;
    }

    const userData: any = jwtDecode(this.requester?.userDataSnapshot?.access_token);

    // if (userData?.userIsActive === false) {
    //   this.router.navigate(['/verify-email']);
    //   return false;
    // }

    if (['OPERATOR', 'ADMIN', 'VIEWER'].includes(userData?.Role)) {
      return true
    }

    this.requester.logout();
    this.snackbar.open("You are not permitted to access this resources!", "Close", {
      duration: 80000
    })
    return false
  }

}
