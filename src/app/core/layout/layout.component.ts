import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

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

  toggleLeftSidebar() {
    this.showLeftSidebar = !this.showLeftSidebar;
  }
  showSidebars = false;

  toggleSidebars() {
    this.showSidebars = !this.showSidebars;
  }
  @ViewChild('drawer') public drawer!: MatSidenav;
}
