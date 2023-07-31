import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }
  letterSort(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * -1 * (isAsc ? 1 : -1);
  }
  numberSort(a: number, b: number, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  dateSort(a: number | string, b: number | string, isAsc: boolean): any {
    return (new Date(b) as any < new Date(a) as any ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
