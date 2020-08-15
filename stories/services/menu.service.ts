import { Injectable } from '@angular/core';

import { IMenuService, Menu } from 'sng-core';

@Injectable({
	providedIn: 'root'
})
export class MenuService extends IMenuService {
  memberMenu: Menu[] = [
		{
			title: 'MENU.DISCOVER',
			link: 'explore',
			icon: 'compass-outline',
			enable: true
		},
		{
			title: 'MENU.OFFERS',
			link: 'offers',
			icon: 'muffin',
			enable: true
		},
		{
			title: 'MENU.SUPPORT',
			link: 'support',
			icon: 'handshake',
			enable: true
		},
		{
			title: 'MENU.WALLET',
			link: 'wallet',
			icon: 'wallet-outline',
			enable: true
		},
  ];

  public get getMemberMenu(): Menu[] {
		return this.memberMenu.filter((el) => {
			return el.enable === true
		});
  };

}
