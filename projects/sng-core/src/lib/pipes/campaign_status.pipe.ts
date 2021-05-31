import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MicrocreditCampaign, MicrocreditSupport, PaymentList, Sector } from '../model';
import { IStaticDataService } from '../services';

@Pipe({
  name: 'campaign_status',
  pure: false,
})
export class CampaignStatusPipe implements PipeTransform {
  public paymentsList: PaymentList[];

  constructor(public translate: TranslateService, private staticDataService: IStaticDataService,
  ) {
    this.paymentsList = this.staticDataService.getPaymentsList;
  }

  transform(campaign: MicrocreditCampaign, args?: string): any {

    const now = new Date();
    const seconds: number = parseInt(now.getTime().toString());

    let _text: string = '', _date: string = '';
    if (campaign.status === 'draft') {
      _text = this.translate.instant('CAMPAIGN.STATUS.DRAFT');
    } else if (campaign.startsAt > seconds) {
      _text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
    } else if ((campaign.startsAt < seconds) && (campaign.expiresAt > seconds)) {
      _text = this.translate.instant('GENERAL.TO');
      _date = new DatePipe('en-US').transform(campaign.expiresAt, 'd.M');
    } else if (campaign.expiresAt < seconds) {
      _text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
      _date = new DatePipe('en-US').transform(campaign.redeemEnds, 'd.M');
    }

    return `${_text} ${_date}`;
  }
}
