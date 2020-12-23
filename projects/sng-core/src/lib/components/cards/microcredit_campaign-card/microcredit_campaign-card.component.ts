import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { IAuthenticationService } from '../../../services';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../model';

@Component({
  selector: 'sng-microcredit_campaign-card',
  templateUrl: './microcredit_campaign-card.component.html',
  styleUrls: ['./microcredit_campaign-card.component.scss']
})
export class MicrocreditCampaignCardComponent implements OnInit {

  /**
   * Imported Variables
   */
  @Input() campaign: MicrocreditCampaign;
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partenr)

  public _text: string = '';
  public _date: number = 0;
  //public canSupport = false;
  //public canRedeem = false;

  constructor(
    private translate: TranslateService,
    private authenticationService: IAuthenticationService
  ) { }

  ngOnInit(): void {
    const now = new Date();
    const seconds = parseInt(now.getTime().toString());

    const currentUser = this.authenticationService.currentUserValue;
    const access = currentUser.user.access;

    if (this.campaign.status === 'draft') {
      this._text = this.translate.instant('CAMPAIGN.STATUS.DRAFT');
    } else if (this.campaign.startsAt > seconds) {
      this._text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
      this._date = this.campaign.startsAt;
    } else if ((this.campaign.expiresAt > seconds) && (seconds > this.campaign.startsAt)) {
      this._date = this.campaign.expiresAt;
      this._text = this.translate.instant('GENERAL.TO');
    } else if (seconds > this.campaign.expiresAt) {
      this._text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
      this._date = this.campaign.redeemEnds;
    }
    // if (this.campaign.status === 'draft') {
    //   this.canSupport = false;
    //   this.flag = this.translate.instant('CAMPAIGN.STATUS.DRAFT');
    // } else if (this.campaign.startsAt > seconds) {
    //   this.canSupport = false;
    //   this.canRedeem = false;
    //   this.flag = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
    // } else if ((this.campaign.expiresAt > seconds) && (seconds > this.campaign.startsAt)) {
    //   this.canSupport = true;
    //   this.flag = this.translate.instant('GENERAL.TO');
    // } else if (seconds > this.campaign.expiresAt) {
    //   this.canSupport = false;
    //   this.flag = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
    //   this.canRedeem = (access == 'partner') ? true : false;
    // }
  }
}
