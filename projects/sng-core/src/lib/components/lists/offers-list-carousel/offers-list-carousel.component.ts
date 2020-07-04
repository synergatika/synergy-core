import { Input, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
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
  @Input() type: string; // 'single' Or 'all'

  /**
   * Content Variables
   */
  public offers: Offer[];

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
   * @param staticDataService: StaticDataService
   * @param itemsService: ItemsService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
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
   * Fetch Loyalty Offers List (for One Partner)
   */
  fetchStoreLoyaltyOffersData(partnerId: string): void {
    this.itemsService.readOffersByStore(partnerId, '0-0-1')
      .pipe(
        tap(
          data => {
            this.offers = this.shuffle(data);

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
}
