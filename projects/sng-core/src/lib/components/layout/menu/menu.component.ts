import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

// Models
import { Menu } from '../../../model';
// Services
import { IMenuService, IAuthenticationService } from '../../../services';

@Component({
  selector: 'sng-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
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
    this.menu =
      currentUser.user['access'] === 'partner'
        ? this.menuService.getPartnerMenu
        : this.menuService.getAdminMenu;
  }

  ngOnInit(): void {
    this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
        this.cdr.markForCheck();
      });
  }

  openNav(): void {
    this.menuService.openNav();
    /*document.getElementById('mySidenav').style.width = '250px';
		document.getElementById('main').style.marginLeft = '250px';
		//document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
		document.body.classList.add('menu-overlay');*/
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav(): void {
    this.menuService.closeNav();
    /*
		document.getElementById('mySidenav').style.width = '0';
		document.getElementById('main').style.marginLeft = '0';
		//document.body.classList.replace('menu-overlay', '');
		document.body.classList.remove('menu-overlay');
		*/
  }

  toggleNav(): void {
    this.menuService.toggleNav();
    /*
		document.getElementById('mySidenav').style.width = '0';
		document.getElementById('main').style.marginLeft = '0';
		//document.body.classList.replace('menu-overlay', '');
		document.body.classList.remove('menu-overlay');
		*/
  }

  getItemCssClasses(item: string): string {
    let classes = '';
    if (this.currentRouteUrl.indexOf(item) !== -1) {
      classes = 'side-menu-item-active';
    }
    return classes;
  }
}
