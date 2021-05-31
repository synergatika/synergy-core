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
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partner)

  constructor(
    private translate: TranslateService,
    private authenticationService: IAuthenticationService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUserValue;
  }
}
