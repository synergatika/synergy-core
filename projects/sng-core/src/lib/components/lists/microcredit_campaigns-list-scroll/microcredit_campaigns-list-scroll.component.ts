import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * Services
 */
import { IItemsService } from '../../../services';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../model';

@Component({
  selector: 'sng-microcredit_campaigns-list-scroll',
  templateUrl: './microcredit_campaigns-list-scroll.component.html',
  styleUrls: ['./microcredit_campaigns-list-scroll.component.scss']
})
export class MicrocreditCampaignsListScrollComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partenr)

  /**
   * Children Modals
   */
  @ViewChild('campaignModal') campaignModal: NgbModalRef;

  /**
   * Content Variables
   */
  public campaigns: MicrocreditCampaign[] = [];
  public campaign: MicrocreditCampaign;

  /**
   * Scroll & Modal Variables
   */
  counter = 0;
  scroll = 6;
  moved: boolean;

  loading = false;
  private unsubscribe: Subject<any>;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param modalService: NgbModal
   * @param matDialog: MatDialog
   * @param itemsService: ItemsService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public matDialog: MatDialog,
    private itemsService: IItemsService,
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchMicrocreditCampaignsData(this.counter);
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Close Modal on Browser Back Button
   */
  controlModalState(state: boolean): void {
    if (state) {
      const modalState = {
        modal: true,
        desc: 'MemberDashboardModals'
      };
      history.pushState(modalState, null);
    } else {
      if (window.history.state.modal) {
        history.back();
      }
    }
  }

  @HostListener('window:popstate')
  dismissModal(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
      this.controlModalState(false);
    }
  }

  /**
   * Fetch Microcredit Campaigns List
   */
  fetchMicrocreditCampaignsData(counter: number): void {
    this.itemsService.readAllPrivateMicrocreditCampaigns(`${this.scroll.toString()}-${counter.toString()}-1`)
      .pipe(
      tap(
        data => {
          this.campaigns = this.campaigns.concat(data);

          console.log("Microcredit Campaigns in List-Scroll", this.campaigns);
        },
        () => {
        }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdRef.markForCheck();
      })
      )
      .subscribe();
  }

  /**
   * On Scroll
   */
  onScroll(): void {
    this.counter = this.counter + 1;
    this.fetchMicrocreditCampaignsData(this.counter);
    console.log('scrolled!!');
    this.cdRef.markForCheck();
  }

  /**
   * Open Microcredit Campaign Modal
   */
  openMicrocredit(campaign: MicrocreditCampaign): void {
    this.campaign = campaign;
    this.controlModalState(true);
    this.modalService.open(
      this.campaignModal,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdropClass: 'fullscrenn-backdrop',
        backdrop: 'static',
        windowClass: 'fullscreen-modal',
      }
    ).result.then(
      () => { console.log('closed'); },
      () => { console.log('dismissed'); });
  }


  /**
   * Actions to Open Modals from Carousel
   */
  mousedown(): void { this.moved = false; }
  mousemove(): void { this.moved = true; }
  mouseup(data: MicrocreditCampaign): void {
    if (!this.moved) {
      this.openMicrocredit(data);
    }
    this.moved = false;
  }
}
