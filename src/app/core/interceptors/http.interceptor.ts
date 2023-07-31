import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from "rxjs/operators";
import { RequesterService } from 'src/app/shared/services/requester.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false; // For Multiple Refresh token request
  constructor(
    private requester: RequesterService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/login') !== -1) {
      return next.handle(request);
    }
    const accessToken = this.requester.userDataSnapshot?.access_token;
    if (accessToken) {
      // Expire earlier 60 second called solved: when access token valid and request is pending in server, then expired when request active
      if (this.requester.isAuthTokenValid(accessToken, 60)) {
        return next.handle(request.clone({
          headers: request.headers.append('Authorization', `Bearer ${accessToken}`)
        }))
      }
      if (!this.isRefreshing) {
        // Request For Refresh Token
        this.isRefreshing = true
        return this.requester.getNewByRefreshToken()
          .pipe(
            take(1),
            switchMap((res: any) => {
              this.isRefreshing = false;
              return next.handle(request.clone({
                headers: request.headers.append('Authorization', `Bearer ${res?.data?.access_token}`)
              }))
            })
          )
      }
      // Pending For New Token 
      return this.requester.userData$.pipe(
        filter(data => (data?.access_token != null && data?.access_token != undefined)),
        take(1),
        switchMap((data) => {
          return next.handle(request.clone({
            headers: request.headers.append('Authorization', `Bearer ${data?.access_token}`)
          }))

        })
      )

    }
    return next.handle(request)
  }
}
