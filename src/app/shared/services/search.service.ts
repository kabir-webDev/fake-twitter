import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = environment.v1Endpoint;

  constructor(private httpService: HttpService, private http: HttpClient) {}
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // @ts-ignore
      return throwError('An Error occurred: ', error.error.message);
    }
    return throwError(`${error.error.message}`);
  }

  searchUser(payload:{token:string}): Observable<any> {
    return this.httpService.post('search',payload);
  }
}
