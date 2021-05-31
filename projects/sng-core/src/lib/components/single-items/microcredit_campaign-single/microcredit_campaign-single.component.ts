import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, Input, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { MicrocreditCampaign, ContactList } from '../../../model';
import { IStepperService, IAuthenticationService, IStaticDataService } from '../../../services';

@Component({
  selector: 'sng-microcredit_campaign-single',
  templateUrl: './microcredit_campaign-single.component.html',
  styleUrls: ['./microcredit_campaign-single.component.scss']
})
export class MicrocreditCampaignSingleComponent implements OnInit, OnDestroy {
  private componentOrTemplateRef: any;

  /**
   * Imported Variables
   */
  @Input() campaign: MicrocreditCampaign;
  public contactsList: ContactList[] = [];
public avatar: string = '';

  public viewSupportButton: boolean = false;
  public canSupportCampaign: boolean = false;
  public canRedeemCampaign: boolean = false;

  public _text: string = '';
  public _date: number = 0;

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   */
  constructor(
    private translate: TranslateService,
    public matDialog: MatDialog,
    private authenticationService: IAuthenticationService,
    private stepperService: IStepperService,
    private staticDataService: IStaticDataService
  ) {
    this.unsubscribe = new Subject();
    this.contactsList = this.staticDataService.getContactsList;
    this.componentOrTemplateRef = this.stepperService.pledgeComponent();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    console.log('Campaign in SingleMicrocredit', this.campaign);

    const now = new Date();
    const seconds: number = parseInt(now.getTime().toString());

    this.viewSupportButton = (this.authenticationService.currentUserValue.user["access"] == 'member');
    this.canSupportCampaign = ((this.campaign.startsAt < seconds) && (this.campaign.expiresAt > seconds));
    this.canRedeemCampaign = ((this.campaign.redeemStarts < seconds) && (this.campaign.redeemEnds > seconds));

    /**begin:Social Media*/
    const currentContactsArray = (this.campaign.partner.contacts).map(a => a.slug);
    const validateContactsList = this.contactsList.filter(function(el) {
      return currentContactsArray.includes(el.slug);
    });
    this.contactsList = validateContactsList.map(o => { return { ...o, value: (this.campaign.partner.contacts).filter(ob => { return ob.slug === o.slug })[0].value } });
    /**end:Social Media*/

    this.avatar = this.campaign.partner.imageURL || '../../../../assets/media/users/default.jpg';
  }

	/**
	 * On destroy
	 */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  scrollTo(selectorName: string): void {
    document.getElementById(selectorName).scrollIntoView();
  }

  pledgeModal(campaign: MicrocreditCampaign) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      campaign: campaign
    };
    const modalDialog = this.matDialog.open(this.componentOrTemplateRef, dialogConfig);
  }

  setComponent<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>): void {
    this.componentOrTemplateRef = componentOrTemplateRef;
  }
}
