import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

// Models
import { Menu } from '../../../model';
// Services
import { IMenuService, IAuthenticationService } from '../../../services';

@Component({
  selector: 'sng-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentRouteUrl: string = '';
  public menu: Menu[];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private menuService: IMenuService,
    private authenticationService: IAuthenticationService
  ) {
    const currentUser = this.authenticationService.currentUserValue;
    this.menu = (currentUser.user['access'] === 'member') ? this.menuService.getMemberMenu : [];
  }

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
