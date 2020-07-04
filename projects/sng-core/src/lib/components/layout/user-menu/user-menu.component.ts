import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Models
import { Menu } from '../../../model';
// Services
import { IMenuService, IAuthenticationService } from '../../../services';

@Component({
  selector: 'sng-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  public menu: Menu[];

  icon: string = './assets/media/images/menu.svg';
  user: any;
  userAvatar: string;

  constructor(
    private cDRef: ChangeDetectorRef,
    private menuService: IMenuService,
    private authenticationService: IAuthenticationService
  ) {
    this.menu = this.menuService.getUserMenu;
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    this.userAvatar =
      this.user.imageURL || '../../../../assets/media/users/default.jpg';
    this.cDRef.markForCheck();
  }

  openNav(): void {
    this.menuService.openNav();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
