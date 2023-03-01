import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MicrocreditCampaign, MicrocreditSupport, Partner, PaymentList, Sector } from '../model';
import { IStaticDataService } from '../services';

@Pipe({
  name: 'support_payment',
  pure: false,
})
export class SupportPaymentPipe implements PipeTransform {
  public paymentsList: PaymentList[];

  constructor(
    public translate: TranslateService,
    private staticDataService: IStaticDataService
  ) {
    this.paymentsList = this.staticDataService.getPaymentsList;
  }

  transform(support: MicrocreditSupport, args?: string): any {
    var partner = support.campaign['partner'] as Partner;

    if (support.payment.method.bic == 'store') {
      return '';
    }

    let _slug: string = '', _value: string = '';
    _slug = this.translate.instant((this.paymentsList.filter((el) => {
      return el.bic == support.payment.method.bic
    })[0].title))
    _value = partner.payments.filter((el) => {
      return el.bic == support.payment.method.bic
    })[0].value

    return `${_slug}, ${_value}`;
  }
}
