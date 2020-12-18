import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

import {
  IStaticDataService,
  IItemsService
} from '../../../services';

import {
  Partner,
  Offer
} from '../../../model';

@Component({
  selector: 'sng-offers-list-carousel',
  templateUrl: './offers-list-carousel.component.html',
  styleUrls: ['./offers-list-carousel.component.scss']
})
export class OffersListCarouselComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partenr)

  /**
   * Children Modals
   */
  @ViewChild('offerModal') offerModal: NgbModal;


  /**
   * Content Variables
   */
  public offers: Offer[]; // Used to store offers
  public offer: Offer; //Used for the Loyalty to open in modal

  /**
   * Carousel & Modal Variables
   */
  customOptions: OwlOptions;
  moved: boolean;

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param modalService: NgbModal
   * @param staticDataService: StaticDataService
   * @param itemsService: ItemsService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private staticDataService: IStaticDataService,
    private itemsService: IItemsService,
  ) {
    this.customOptions = this.staticDataService.getOwlOptionsTwo;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchStoreLoyaltyOffersData(this.partner._id);
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
   * Fetch Loyalty Offers List (for One Partner)
   */
  fetchStoreLoyaltyOffersData(partnerId: string): void {
    this.itemsService.readOffersByStore(partnerId, '0-0-1')
      .pipe(
      tap(
        data => {
          this.offers = this.shuffle(data);

          console.log("Loyalty Offers in List-Carousel", this.offers);

          //TEMP FOR DEMO
          if (this.offers.length && this.offers.length < 3) {
            this.offers.push(this.offers[0]);
            this.offers.push(this.offers[0]);
          }
        },
        error => console.log),
      finalize(() => {
        this.loading = false;
        this.cdRef.markForCheck();
      })
      )
      .subscribe();
  }

  /**
   * Randomize Data
   */
  shuffle(array: Offer[]): Array<any> {
    return array.sort(() => Math.random() - 0.5);
  }

  /**
   * Open Loyalty Offer Modal
   */
  openLoyalty(offer: Offer): void {
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
  mousedown() { this.moved = false; }
  mousemove() { this.moved = true; }
  mouseup(data: Offer) {
    if (!this.moved) {
      this.openLoyalty(data);
    }
    this.moved = false;
  }
}
