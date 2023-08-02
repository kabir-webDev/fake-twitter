import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [SidebarLeftComponent, SidebarRightComponent, LayoutComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule, MatSidenavModule],
  exports: [LayoutComponent, SidebarLeftComponent, SidebarRightComponent],
})
export class LayoutModule { }
