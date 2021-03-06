//Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { tap, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import {
  IStaticDataService,
  IContentService,
  ILoyaltyService
} from '../../../services';

/**
 * Models & Interfaces
 */
import { Balance } from '../../../model';


@Component({
  selector: 'sng-loyalty_balance-card',
  templateUrl: './loyalty_balance-card.component.html',
  styleUrls: ['./loyalty_balance-card.component.scss']
})
export class LoyaltyBalanceCardComponent implements OnInit, OnDestroy {

  /**
   * Children Modals
   */
  @ViewChild('balanceModal') balanceModal: NgbModalRef;

  /**
   * Content Variables
   */
  public balance: Balance; // The loyalty badge of member

  loading = false;
  private unsubscribe: Subject<any>;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param modalService: NgbModal
   * @param translate: TranslateService
   * @param contentService: ContentService
   * @param loyaltyService: LoyaltyService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private contentService: IContentService,
    private loyaltyService: ILoyaltyService,
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchLoyaltyBalanceData();
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
   * Fetch Loyalty Balance
   */
  fetchLoyaltyBalanceData(): void {
    this.loyaltyService.readBalance()
      .pipe(
      tap(
        data => {
          this.balance = { points: parseInt(data.points, 16), address: data.address };
          // Get static content of Balance Points
          console.log('Loyalty Balance Card', this.balance);
          // this.contentService.readContentById('Synergy Points')
          //   // this.staticContentService.readText('18')
          //   .pipe(
          //   tap(
          //     data => {
          //       this.balance['text'] = data;
          //       console.log(this.balance);
          //     },
          //     error => {
          //       console.log(error);
          //     }
          //   ),
          //   takeUntil(this.unsubscribe),
          //   finalize(() => {
          //     this.loading = false;
          //     this.cdRef.markForCheck();
          //   })
          //   ).subscribe();
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
   * Open Wallet Modal
   */
  openBalance(): void {
    this.controlModalState(true);
    this.modalService.open(this.balanceModal)
      .result.then(
      () => { this.controlModalState(false); console.log('closed'); },
      () => { this.controlModalState(false); console.log('dismissed'); });
  }
}
