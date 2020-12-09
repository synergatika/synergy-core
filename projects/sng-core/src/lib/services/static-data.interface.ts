import { PaymentList } from '../model';

import { OwlOptions } from 'ngx-owl-carousel-o';

export abstract class IStaticDataService {
  abstract get getOwlOptionsTwo(): OwlOptions;

  abstract get getMapPinStyle(): any;

  abstract get getOwlOptionsThree(): OwlOptions;

  abstract get getPaymentsList(): PaymentList[];

  abstract get getBadgesImages(): any;

  abstract get getSectorList(): any;

  abstract get getContactsList(): any;
}
