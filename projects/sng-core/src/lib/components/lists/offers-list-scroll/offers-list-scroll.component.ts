import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, finalize, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**
 * Services
 */
import { IItemsService } from '../../../services';

/**
 * Models & Interfaces
 */
import { Offer } from '../../../model';

@Component({
  selector: 'sng-offers-list-scroll',
  templateUrl: './offers-list-scroll.component.html',
  styleUrls: ['./offers-list-scroll.component.scss']
})
export class OffersListScrollComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partenr)

  /**
   * Children Modals
   */
  @ViewChild('offerModal') offerModal: NgbModalRef;

  /**
   * Content Variables
   */
  public offers: Offer[] = [];
  public offer: Offer;

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
    private itemsService: IItemsService
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchLoyaltyOffersData(this.counter);
  }

  /**
   * On destroy
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
   * Fetch Loyalty Offers List
   */
  fetchLoyaltyOffersData(counter: number): void {
    this.itemsService.readAllOffers(`${this.scroll.toString()}-${counter.toString()}-1`)
      .pipe(
      tap(
        data => {
          this.offers = this.offers.concat(data);
          console.log("Loyalty Offers in List-Scroll", this.offers);
        },
        error => {
          console.log(error);
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
  onScroll() {
    this.counter = this.counter + 1;
    this.fetchLoyaltyOffersData(this.counter);
    console.log('scrolled!!');
    //	this.offers = this.offers.concat(this.offers);
    this.cdRef.markForCheck();
  }

  /**
   * Open Loaylty Offer Modal
   */
  openLoaylty(offer: Offer): void {
    this.offer = offer;
    this.controlModalState(true);
    this.modalService.open(
      this.offerModal,
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
  mouseup(data: Offer): void {
    if (!this.moved) {
      this.openLoaylty(data);
    }
    this.moved = false;
  }
}
