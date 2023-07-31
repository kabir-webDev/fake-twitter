import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpService } from './http.service';

import * as endpoints from '../../auth/auth.endpoint';
import * as moment from 'moment';
import { LocalStorageService } from 'ngx-webstorage';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const KC_REQUESTER = 'kc-requester';

interface LoginData {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class RequesterService {
  private tokenExpirationTime!: number;

  private _userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  userData$: Observable<any> = this._userDataSubject.asObservable();

  timeoutId: any;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private http: HttpService
  ) // private $localStorage: LocalStorageService,
  {
    if (
      localStorage.getItem(ACCESS_TOKEN) &&
      localStorage.getItem(REFRESH_TOKEN)
    ) {
      const access_token = <string>localStorage.getItem(ACCESS_TOKEN);
      const refresh_token = <string>localStorage.getItem(REFRESH_TOKEN);
      this.loadUserData({ access_token });
    }
  }

  get() {
    return this._userDataSubject.value;
  }

  // save(user) {
  //   this.$localStorage.store('kc-requester', user);
  //   this.loadUserData(user);
  //   if (user && user.hasOwnProperty('refreshToken')) {
  //     this.tokenExpireSetTimeout(user);
  //   } else {
  //     if (this.timeoutId) {
  //       clearTimeout(this.timeoutId)
  //     }
  //   }
  // }

  // clear() {
  //   this.$localStorage.clear('kc-requester');
  //   this.loadUserData(null);
  //   if (this.timeoutId) {
  //     clearTimeout(this.timeoutId)
  //   }
  // }

  loadUserData(data: LoginData): void {
    this._userDataSubject.next({
      access_token: data.access_token,
      userData: this.getUserDataFromToken(data.access_token),
    });
    const decoded: any = jwtDecode(data.access_token);
    // const exp = Date.parse(decoded?.exp)
    this.tokenExpirationTime = decoded.exp;
    let date = new Date(decoded?.exp);
    let firstDate = date.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    console.log('-----validity::', firstDate);

    // if (data?.refresh_token) {
    //   this.tokenExpireSetTimeout()
    // }
  }

  setTokenExpirationTime(expirationTime: number) {
    this.tokenExpirationTime = expirationTime;
  }

  // Function to check if the token is still valid
  isTokenValid(): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert current time to Unix timestamp
    return this.tokenExpirationTime > currentTimestamp;
  }

  get userDataSnapshot(): any {
    return this._userDataSubject.value;
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(KC_REQUESTER);
    this._userDataSubject.next(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.router.navigate(['/auth/login']);
  }

  get isAuthenticated(): boolean {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      return false;
    }
    
    return this.isAuthTokenValid(access_token);
  }

  isAuthTokenValid( accessToken: string): boolean {
    const decoded: any = jwtDecode(accessToken);
    this.tokenExpirationTime = decoded.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);     
    return this.tokenExpirationTime > currentTimestamp;
  }

  getUserDataFromToken(token: string): any {
    const decoded: any = jwtDecode(token);
    return decoded;
  }

  get getUserCompanyId(): string {
    return this._userDataSubject.value?.userData?.companyId;
  }

  getTokenExpireTime(token: string): any {
    const decoded: any = jwtDecode(token);
    const unixTimestamp = moment(
      decoded?.ExpiresAt,
      'YYYY-MM-DD HH:mm:ss.SSS'
    ).unix();
    return unixTimestamp;
  }

  tokenExpireSetTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    const refreshToken = this._userDataSubject.value?.refresh_token;
    const accessToken = this._userDataSubject.value?.access_token;
    if (refreshToken) {
      const expireTimeForAccessToken = this.getTokenExpireTime(accessToken);
      const duration = expireTimeForAccessToken * 1000 - new Date().getTime();
      this.timeoutId = setTimeout(() => {
        this.getNewByRefreshToken().subscribe();
      }, duration);
    }
  }

  get isSuperAdmin(): boolean {
    return this.userDataSnapshot?.userData?.role === 'SUPER_ADMIN';
  }

  get isAdmin(): boolean {
    return this.userDataSnapshot?.userData?.role === 'ADMIN';
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    const currentUser = this.userDataSnapshot;
    const _authorities: string[] =
      typeof authorities === 'string' ? [authorities] : authorities;
    return _authorities.some((r) => currentUser.authorities.includes(r));
  }

  // API
  getNewByRefreshToken(): Observable<any> {
    const refresh_token = this.userDataSnapshot?.refresh_token;
    const expireTime = this.getTokenExpireTime(refresh_token);

    if (new Date().getTime() > expireTime * 1000) {
      this.snackbar.open(
        'Your session has been expired! Please Sign In Again.',
        'close',
        { duration: 5000 }
      );
      this.logout();
      return of(false);
    }

    return this.http
      .authPost(
        endpoints.REFRESH_TOKEN,
        {
          refresh_token: refresh_token,
        },
        { grant_type: 'refresh_token' }
      )
      .pipe(
        map((res: any) => {
          const access_token = res?.data?.access_token;
          const refresh_token = res?.data?.refresh_token;
          this.loadUserData({ access_token });
          localStorage.setItem(ACCESS_TOKEN, access_token);
          localStorage.setItem(REFRESH_TOKEN, refresh_token);
          return res;
        })
      );
  }
}
