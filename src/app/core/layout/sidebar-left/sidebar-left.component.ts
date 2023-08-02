import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { RequesterService } from 'src/app/shared/services/requester.service';

interface SidebarItem {
  icon: string;
  link: string;
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
      link: '/',
      name: 'Home'
    },
    {
      icon: 'search',
      link: '/users',
      name: 'Explore'
    },
    {
      icon: 'notifications',
      link: '/',
      name: 'Notifications'
    },
    {
      icon: 'mail',
      link: '/',
      name: 'Message'
    },
    {
      icon: 'list_alt',
      link: '/',
      name: 'Lists'
    },
    {
      icon: 'bookmark',
      link: '/',
      name: 'Bookmark'
    },
    {
      icon: 'group',
      link: '/',
      name: 'Communities'
    },
    {
      icon: 'verified',
      link: '/',
      name: 'Verified'
    },
    {
      icon: 'person',
      link: '/my-profile',
      name: 'Profile'
    },
    {
      icon: 'pending',
      link: '/',
      name: 'More'
    },
  ]

  logout():void{
    this.requester.logout();
  }
}
