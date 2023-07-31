import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private dataSource = new BehaviorSubject('');
  getToolBarData = this.dataSource.asObservable();
  constructor() {
  }
  changeToolBarData(title: any) {
    this.dataSource.next(title);
  }
}
