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
    const accessToken = localStorage.getItem('access_token');
    
    if (accessToken) {
      
      if (this.requester.isAuthTokenValid(accessToken)) {
        return next.handle(request.clone({
          headers: request.headers.append('X-Jwt-Token', `Bearer ${accessToken}`)
        }))
      }

    }
    return next.handle(request)
  }
}
