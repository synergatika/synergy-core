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
  selector: 'sng-microcredit_campaign-little-card',
  templateUrl: './microcredit_campaign-little-card.component.html',
  styleUrls: ['./microcredit_campaign-little-card.component.scss']
})
export class MicrocreditCampaignLittleCardComponent implements OnInit {

  /**
   * Imported Variables
   */
  @Input() campaign: MicrocreditCampaign;
  @Input() type: any;
  @Input() action: any;

  seconds = 0;
  public flag: string = '';
  public canSupport = false;
  public canRedeem = false;

  constructor(
    private translate: TranslateService,
    private authenticationService: IAuthenticationService
  ) { }

  ngOnInit(): void {
    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());
    // console.log('Campaign')
    // console.log(this.microcredit);
    const currentUser = this.authenticationService.currentUserValue;
    const access = currentUser.user.access;

    if (this.campaign.status === 'draft') {
      this.canSupport = false;
      this.flag = this.translate.instant('CAMPAIGN.STATUS.DRAFT');
    } else if (this.campaign.startsAt > this.seconds) {
      this.canSupport = false;
      this.canRedeem = false;
      this.flag = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
    } else if ((this.campaign.expiresAt > this.seconds) && (this.seconds > this.campaign.startsAt)) {
      this.canSupport = true;
      this.flag = this.translate.instant('GENERAL.TO');
    } else if (this.seconds > this.campaign.expiresAt) {
      this.canSupport = false;
      this.flag = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
      this.canRedeem = (access == 'partner') ? true : false;
    }
  }
}
