import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import {
  IPartnersService,
  IStaticDataService,
  IEnvironmentService
} from '../../../services';

import {
  Partner
} from '../../../model';

@Component({
  selector: 'sng-partners-list-carousel',
  templateUrl: './partners-list-carousel.component.html',
  styleUrls: ['./partners-list-carousel.component.scss']
})
export class PartnersListCarouselComponent implements OnInit, OnDestroy {

  /**
   * Children Modals
   */
  @ViewChild('partnerModal') partnerModal: NgbModal;
  @Input() interactive: boolean;

  /**
   * Configuration and Static Data
   */
  public configAccess: Boolean[] = this.enviromentService.access;

  /**
   * Carousel Variables
   */
  customOptions: OwlOptions;
  moved: boolean;

  /**
   * Content Variables
   */
  public partners: Partner[];
  public partner: Partner;
  // offers: Offer[];
  // events: Event[];
  // currentOpenModal: NgbModalRef;

  // singleOffers: Offer;
  // singleMicrocredit: MicrocreditCampaign;

  private unsubscribe: Subject<any>;
  loading: boolean = false;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param modalService: NgbModal
   * @param translate: TranslateService
   * @param staticDataService: StaticDataService
   * @param loyaltyService: LoyaltyService
   * @param microcreditService: MicrocreditService
   * @param contentService: ContentService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private staticDataService: IStaticDataService,
    private partnersService: IPartnersService,
    private enviromentService: IEnvironmentService
  ) {
    this.customOptions = this.staticDataService.getOwlOptionsThree;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchPartnersData();
  }

  /**
   * On Destory
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
        desc: 'MemberExploreModals'
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
   * Fetch Partners List
   */
  fetchPartnersData(): void {
    this.partnersService.readPartners('0-0-0')
      .pipe(
      tap(
        data => {
          this.partners = this.shuffle(data);
          console.log("Partners in List-Carousel", this.partners);
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
   * Randomize Data
   */
  shuffle(array: Partner[]): Array<any> {
    return array.sort(() => Math.random() - 0.5);
  }

  /**
   * Open Partner Modal
   */
  openPartner(partner: Partner): void {
    this.partner = partner;
    this.controlModalState(true);
    this.modalService.open(
      this.partnerModal,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdropClass: 'fullscrenn-backdrop',
        backdrop: 'static',
        windowClass: 'fullscreen-modal',
      }
    )
      .result.then(
      (result) => { this.controlModalState(false); console.log('closed'); },
      (reason) => { this.controlModalState(false); console.log('dismissed'); });
  }

  /**
   * Actions to Open Modals from Carousel
   */
  mousedown(): void { this.moved = false; }
  mousemove(): void { this.moved = true; }
  mouseup(data: Partner): void {
    if (!this.moved) {
      this.openPartner(data);
    }
    this.moved = false;
  }
}
