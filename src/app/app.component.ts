import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToolbarService } from './shared/services/toolbar.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fake-twitter';
  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private toolbarService: ToolbarService,
  ) { }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((_) => {
          let _route = this.route.firstChild;
          while (_route?.firstChild) {
            _route = _route.firstChild;
          }
          return _route;
        }),
        switchMap((_route: any) => _route.data)
      )
      .subscribe((data: any) => {
        this.titleService.setTitle(
          data?.title ? `${data?.title} | Fake Twitter` : 'Fake Twitter'
        );
        this.toolbarService.changeToolBarData({
          toolbarTitle: data?.toolbarTitle || '',
        });
      });
  }
}

