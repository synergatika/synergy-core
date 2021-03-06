import { Input, Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

/**
 * Services
 */
import { IStaticDataService, IMicrocreditService } from '../../../services';

/**
 * Models & Interfaces
 */
import { MicrocreditSupport, PaymentList } from '../../../model';

@Component({
  selector: 'sng-microcredit_supports-list-pagination',
  templateUrl: './microcredit_supports-list-pagination.component.html',
  styleUrls: ['./microcredit_supports-list-pagination.component.scss']
})
export class MicrocreditSupportsListPaginationComponent implements OnInit, OnDestroy {

  /**
   * Children Modals
   */
  @ViewChild('supportModal') supportModal: NgbModalRef;

  /**
   * Configuration and Static Data
   */
  // public configAccess: Boolean[] = environment.access;
  // public paymentsList: PaymentList[];

  /**
   * Content Variables
   */
  public supports: MicrocreditSupport[]; //Used to store microcredits
  public support: MicrocreditSupport; //Used for the Microcreit to open in modal

  p = 1;

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
    private microcreditService: IMicrocreditService,
  ) {
    // this.paymentsList = this.staticDataService.getPaymentsList;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchMicrocreditSupportsData();
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
   * Fetch Microcredit Supports List (for One Member)
   */
  fetchMicrocreditSupportsData(): void {
    this.microcreditService.readAllBackerSupports('0-0-1')
      .pipe(
        tap(
          data => {
            this.supports = data;
            console.log('On Microcredit Support List Pagination', this.supports)
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
   * Open Support Modal
   */
  openSupport(support: MicrocreditSupport): void {
    this.support = support;// {
    //   ...support,
    //   how: (support.method == 'store') ? { title: '', value: null } : {
    //     title: this.paymentsList.filter((el) => {
    //       return el.bic == support.method
    //     })[0].title,
    //     value: support.campaign.partner.payments.filter((el) => {
    //       return el.bic == support.method
    //     })[0].value
    //   }
    // };

    this.controlModalState(true);
    this.modalService.open(this.supportModal)
      .result.then(
        (result) => { this.controlModalState(false); console.log('closed'); },
        (reason) => { this.controlModalState(false); console.log('dismissed'); });
  }
}
