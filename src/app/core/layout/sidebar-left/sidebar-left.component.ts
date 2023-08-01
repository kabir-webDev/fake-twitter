import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { RequesterService } from 'src/app/shared/services/requester.service';

interface SidebarItem {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {
  constructor(
    private loginService: AuthService,
    private requester: RequesterService,
  ) {

  }

  sidebarList: SidebarItem[] = [
    {
      icon: 'home',
      name: 'Home'
    },
    {
      icon: 'search',
      name: 'Explore'
    },
    {
      icon: 'notifications',
      name: 'Notifications'
    },
    {
      icon: 'mail',
      name: 'Message'
    },
    {
      icon: 'list_alt',
      name: 'Lists'
    },
    {
      icon: 'bookmark',
      name: 'Bookmark'
    },
    {
      icon: 'group',
      name: 'Communities'
    },
    {
      icon: 'verified',
      name: 'Verified'
    },
    {
      icon: 'person',
      name: 'Profile'
    },
    {
      icon: 'pending',
      name: 'More'
    },
  ]

  logout():void{
    this.requester.logout();
  }
}
