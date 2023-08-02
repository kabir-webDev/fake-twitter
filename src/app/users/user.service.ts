import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../shared/services/http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.v1Endpoint;

  constructor(private httpService: HttpService, private http: HttpClient) {}
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // @ts-ignore
      return throwError('An Error occurred: ', error.error.message);
    }
    return throwError(`${error.error.message}`);
  }

  getAllUsers(page:number): Observable<any> {
    let queryParam = {page, size:30}
    return this.httpService.get('users',queryParam);
  }
  getTweetsByUserId(id:number, page:number): Observable<any> {
    let queryParam = {page, size:30}
    return this.httpService.get('users/'+id+'/tweets', queryParam);
  }
  getFollowingsByUserId(id:number, page:number): Observable<any> {
    let queryParam = {page, size:30}
    return this.httpService.get('users/'+id+'/following',queryParam);
  }
  getFollowersByUserId(id:number, page:number): Observable<any> {
    let queryParam = {page, size:30}
    return this.httpService.get('users/'+id+'/followers',queryParam);
  }
  followUser(id:number): Observable<any> {
    const payload = {
      user_id: id
    }
    return this.httpService.post('follow', payload);
  }
  unfollowUser(id:number): Observable<any> {
    const payload = {
      user_id: id
    }
    return this.httpService.post('unfollow', payload);
  }
}
