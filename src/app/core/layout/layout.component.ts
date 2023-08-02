import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { takeWhile } from 'rxjs';
import { RequesterService } from 'src/app/shared/services/requester.service';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';

interface SidebarItem {
  icon: string;
  link: string;
  name: string;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  showLeftSidebar: boolean = false;
  showRightSidebar: boolean = false;
  routeData: any;
  isAlive: boolean = true;

  sidebarList = [
    {
      icon: 'home',
      link: '/',
      name: 'Home'
    },
    {
      icon: 'search',
      link: '/users',
      name: 'Explore'
    },
    {
      icon: 'person',
      link: '/my-profile',
      name: 'Profile'
    },
  ]
  
  constructor(
    private toolbarService: ToolbarService,
    private requester: RequesterService
    ){
        this.toolbarService.getToolBarData.pipe(takeWhile(() => this.isAlive)).subscribe(res => {
      this.routeData = res;
      console.log('this.routeData',res);
      
    })
  }

  toggleLeftSidebar() {
    this.showLeftSidebar = !this.showLeftSidebar;
  }
  showSidebars = false;
  ngOnDestroy(): void {
    this.isAlive = false
  }
  toggleSidebars() {
    this.showSidebars = !this.showSidebars;
  }
  @ViewChild('drawer') public drawer!: MatSidenav;
  logout():void{
    this.requester.logout();
  }
}
