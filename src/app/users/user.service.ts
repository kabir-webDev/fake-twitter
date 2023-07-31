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

  getAllUsers(): Observable<any> {
    // return this.http.get(this.baseUrl + 'users?page=5&size=30')
    return this.httpService.get('users?page=5&size=30','');
  }
}