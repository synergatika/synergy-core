import { Menu } from '../model';

export abstract class IMenuService {
  abstract openNav(): void;

  abstract closeNav(): void;

  abstract toggleNav(): void;

  abstract get getUserMenu(): Menu[];

  abstract get getPartnerMenu(): Menu[];

  abstract get getAdminMenu(): Menu[];

  abstract get getMemberMenu(): Menu[];
}
