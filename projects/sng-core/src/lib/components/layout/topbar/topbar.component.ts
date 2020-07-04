import { Title } from '@angular/platform-browser';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
// RxJS
import { filter, map, mergeMap } from 'rxjs/operators';

import { IAuthenticationService } from '../../../services';

@Component({
  selector: 'sng-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  user: any;
  title: string;

  constructor(
    private translate: TranslateService,
    private authenticationService: IAuthenticationService,
    private cDRef: ChangeDetectorRef,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => {
          if (data.title) {
            return data.title;
          } else {
            return this.router.url.split('/').reduce((acc, frag) => {
              if (acc && frag) {
                acc += ' / ';
              }
              return acc + frag;
            });
          }
          //
        })
      )
      .subscribe((val) => {
        this.title = val;
        this.cDRef.markForCheck();
        translate.get(val).subscribe((translation: string) => {
          this.titleService.setTitle(translation);
        });
      });
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
  }
}
