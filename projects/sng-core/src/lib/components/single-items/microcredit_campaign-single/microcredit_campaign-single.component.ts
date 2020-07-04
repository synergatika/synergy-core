import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, Input, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';

import { MicrocreditCampaign } from '../../../model';

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

  seconds = 0;
  public canSupportCampaign = false;

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   */
  constructor(
    public matDialog: MatDialog
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    console.log('Campaign in SingleMicrocredit', this.campaign);

    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());

    this.canSupportCampaign = ((this.campaign.startsAt < this.seconds) && (this.campaign.expiresAt > this.seconds)) ? true : false;
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

  setComponent <T> (componentOrTemplateRef: ComponentType<T> | TemplateRef<T>): void {
    this.componentOrTemplateRef = componentOrTemplateRef;
  }
}
