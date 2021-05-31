import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, Input, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';

import { LoyaltyOffer, ContactList } from '../../../model';
import { IStepperService, IAuthenticationService, IStaticDataService } from '../../../services';

@Component({
  selector: 'sng-loyalty_offer-single',
  templateUrl: './loyalty_offer-single.component.html',
  styleUrls: ['./loyalty_offer-single.component.scss']
})
export class LoyaltyOfferSingleComponent implements OnInit, OnDestroy {
  private componentOrTemplateRef: any;

  /**
   * Imported Variables
   */
  @Input() offer: LoyaltyOffer;
  public contactsList: ContactList[] = [];
  public avatar: string = '';

  seconds = 0;
  public canSupportCampaign: boolean = false;
  public viewSupportButton: boolean = false;

  access: string = '';

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   */
  constructor(
    public matDialog: MatDialog,
    private authenticationService: IAuthenticationService,
    private stepperService: IStepperService,
    private staticDataService: IStaticDataService
  ) {
    this.unsubscribe = new Subject();
    this.contactsList = this.staticDataService.getContactsList;
    // this.componentOrTemplateRef = this.stepperService.pledgeComponent();
    this.viewSupportButton = (this.authenticationService.currentUserValue.user["access"] == 'member');
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    console.log('Offer in SingleLoalty', this.offer);

    /**begin:Social Media*/
    const currentContactsArray = (this.offer.partner.contacts).map(a => a.slug);
    const validateContactsList = this.contactsList.filter(function(el) {
      return currentContactsArray.includes(el.slug);
    });
    this.contactsList = validateContactsList.map(o => { return { ...o, value: (this.offer.partner.contacts).filter(ob => { return ob.slug === o.slug })[0].value } });
    /**end:Social Media*/
    this.avatar = this.offer.partner.imageURL || '../../../../assets/media/users/default.jpg';

    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());

    //this.canSupportCampaign = ((this.viewSupportButton) && (this.campaign.startsAt < this.seconds) && (this.campaign.expiresAt > this.seconds)) ? true : false;
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

  // pledgeModal(campaign: MicrocreditCampaign) {
  //   const dialogConfig = new MatDialogConfig();
  //   // The user can't close the dialog by clicking outside its body
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modal-component';
  //   dialogConfig.height = 'auto';
  //   dialogConfig.width = '600px';
  //   dialogConfig.data = {
  //     campaign: campaign
  //   };
  //   const modalDialog = this.matDialog.open(this.componentOrTemplateRef, dialogConfig);
  // }

  // setComponent<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>): void {
  //   this.componentOrTemplateRef = componentOrTemplateRef;
  //}
}
