import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { RequesterService } from '../shared/services/requester.service';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

interface LoginPayload {
  email: string,
  password: string
}

interface SignUpPayload {
  email: string,
  password: string
}

interface UserModel {
  username: string;
  firstName: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  get token(): any {
    return localStorage.getItem('access_token');
  }

  constructor(private http: HttpService, private requester: RequesterService) {
    this.user = this.getUser(this.token);
  }

  // API Call
  login(payload: LoginPayload): Observable<any> {
    return this.http
      .authPost('login', payload)
      .pipe(
        map((res: any) => {
          const access_token = res?.token;
          this.requester.loadUserData({ access_token });
          localStorage.setItem('access_token', access_token);
          return res;
        })
      );
  }
  
  signup(payload: SignUpPayload): Observable<any> {
    console.log('payload:',payload);
    
    return this.http
      .authPost('signup', payload)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  sendUserData(code: any): Observable<any> {
    const payload = {
      code: code,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .authPost('login', payload, {
        grant_type: 'authorization_code',
      })
      .pipe(
        map((res: any) => {
          const access_token = res?.data?.access_token;
          const refresh_token = res?.data?.refresh_token;
          this.requester.loadUserData({ access_token });
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          return res;
        })
      );
  }

  private getUser(token: string) {
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }
}
