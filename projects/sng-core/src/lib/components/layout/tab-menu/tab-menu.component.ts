import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAuthenticationService, IMenuService } from '../../../services';

import { Menu } from '../../../model';

@Component({
  selector: 'sng-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  currentRouteUrl: string = '';
  public menu: Menu[];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private translate: TranslateService,
    private menuService: IMenuService,
    private authenticationService: IAuthenticationService
  ) {
    const currentUser = this.authenticationService.currentUserValue;
    this.menu = (currentUser.user['access'] === 'member') ? this.menuService.getUserMenu : [];
  }

	/**
	 * On Init
	 */
  ngOnInit(): void {
    this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
        this.cdr.markForCheck();
      });
  }

  getItemCssClasses(item: string): string {
    let classes = 'footer-menu-item';
    if (this.currentRouteUrl.indexOf(item) !== -1) {
      classes += ' footer-menu-item-active';
    }
    return classes;
  }
}
