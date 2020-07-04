// Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { tap, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { IItemsService } from '../../../services';

import { Offer } from '../../../model';

@Component({
  selector: 'sng-offers-list-scroll',
  templateUrl: './offers-list-scroll.component.html',
  styleUrls: ['./offers-list-scroll.component.scss']
})
export class OffersListScrollComponent implements OnInit, OnDestroy {

  /**
   * Content Variables
   */
  public offers: Offer[] = [];

  /**
   * Scroll & Modal Variables
   */
  counter = 0;
  scroll = 6;

  loading = false;
  private unsubscribe: Subject<any>;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param translate: TranslateService
   * @param itemsService: ItemsService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private itemsService: IItemsService,
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
   * Fetch Loyalty Offers List
   */
  fetchLoyaltyOffersData(counter: number): void {
    this.itemsService.readAllOffers(`${this.scroll.toString()}-${counter.toString()}-1`)
      .pipe(
        tap(
          data => {
            this.offers = this.offers.concat(data);
            if (true) console.log('Offers Data on \'Offers List Scroll\'', this.offers)
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
}
