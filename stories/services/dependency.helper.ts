import {
  IStaticDataService,
  IPartnersService,
  IEnvironmentService,
  IAuthenticationService,
  IMenuService,
  ITranslationService,
} from 'sng-core';

import { MenuService } from './menu.service';
import { environment } from './environment';
import { PartnersService } from './partners.service';
import { StaticDataService } from './static-data.service';
import { TranslationService } from './translation.service';
import { AuthenticationService } from './authentication.service';

export const provider = [
  { provide: IMenuService, useClass: MenuService },
  { provide: IPartnersService, useClass: PartnersService },
  { provide: IStaticDataService, useClass: StaticDataService },
  { provide: ITranslationService, useClass: TranslationService },
  { provide: IAuthenticationService, useClass: AuthenticationService },
  { provide: IEnvironmentService, useValue: environment }
];
