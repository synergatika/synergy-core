import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

/**
 * Services
 */
import { LoyaltyOffer } from '../../../model';
import { Statistics } from '../../../model';
import { ILoyaltyService } from '../../../services';

@Component({
  selector: 'sng-offer-statistics',
  templateUrl: './offer-statistics.component.html',
  styleUrls: ['./offer-statistics.component.scss']
})
export class OfferStatisticsComponent implements OnInit, OnDestroy {
  /**
   * Imported Variables
   */
  @Input() offer: LoyaltyOffer;

  /**
   * Content Variables
   */
  public dateFilter: Date;
  public maxDate: Date;
  public statistics: Statistics;
  public validatedDates: string[];

  public total;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
    * Component Constructor
    */
  constructor(
    private cdRef: ChangeDetectorRef,
    private loyaltyService: ILoyaltyService
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit() {
    console.log(this.offer)
    this.maxDate = new Date();
    this.fetchOfferStatistics('0');
    // this.maxDate = new Date();
    // this.validatedDates = (this.offer.statistics) ? this.offer.statistics.byDate.map(obj => { return obj.date }) : [];
    // this.statistics = (this.offer.statistics) ? this.offer["statistics"] : { _id: "-1", quantity: 0, users: 0, count: 0 };
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  dateformat(d: Date): string {
    let date: any;
    let month: any;

    if (d.getDate().toString().length < 2) {
      date = '0' + d.getDate().toString()
    } else {
      date = d.getDate().toString()
    }

    if ((d.getMonth() + 1).toString().length < 2) {
      month = '0' + (d.getMonth() + 1).toString()
    } else {
      month = (d.getMonth() + 1).toString()
    }

    // return d.getFullYear().toString() + "/" + month + "/" + date;
    return `${d.getFullYear().toString()}-${month}-${date}`;
  }

  activeDates(d: Date): boolean {
    return this.validatedDates.includes(this.dateformat(d));
  }

  applyFilterDate(event) {
    this.fetchOfferStatistics(this.dateformat(event.value));

    // this.statistics = this.offer.statistics.byDate.filter(obj =>
    //   obj.date === this.dateformat(event.value))[0];
  }

  clearFilterDate() {
    this.dateFilter = null;
    this.statistics = this.total;
    // this.statistics = this.offer.statistics;
  }

  /**
 * Fetch Loyalty Statistics
 */
  fetchOfferStatistics(_date: string) {
    this.loyaltyService.readOfferStatistics(this.offer.partner._id, this.offer._id, _date)
      .pipe(
        tap(
          data => {
            this.statistics = data;
            console.log(this.statistics)

            if (_date === '0') this.total = data;
            this.validatedDates = this.total.dates;
            // this.statisticsEarn = this.statistics['total'].earn;
            // this.statisticsRedeem = this.statistics['total'].redeem;

            // const datesRedeem = (this.statistics.statisticsRedeem) ? this.statistics.statisticsRedeem.byDate.map(obj => { return obj.date }) : [];
            // const datesEarn = (this.statistics.statisticsEarn) ? this.statistics.statisticsEarn.byDate.map(obj => { return obj.date }) : [];
            // this.validatedDates = datesRedeem.concat(datesEarn);
            // this.statisticsEarn = (this.statistics.statisticsEarn) ? this.statistics.statisticsEarn : { amount: 0, users: 0, count: 0 };
            // this.statisticsRedeem = (this.statistics.statisticsRedeem) ? this.statistics.statisticsRedeem : { amount: 0, users: 0, count: 0 };
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  exportToCsv() {
    if (!this.statistics['redeem'] || !this.statistics['redeem'].uniqueTransactions.length) return;

    this.loyaltyService.exportOfferStatistics(this.offer.partner._id, this.offer._id, this.dateFilter ? this.dateformat(this.dateFilter) : '0');

  }
  // setOptionCSV(title: string) {
  //   return {
  //     fieldSeparator: ',',
  //     filename: title,
  //     quoteStrings: '"',
  //     decimalSeparator: '.',
  //     showLabels: true,
  //     // showTitle: true,
  //     // title: 'My Awesome CSV',
  //     useTextFile: false,
  //     useBom: true,
  //     //  useKeysAsHeaders: true,
  //     headers: ['Date', 'Quantity', 'Total Transactions', 'Unique Users']//<-- Won't work with useKeysAsHeaders present!
  //   };
  // }

  // exportToCSV(data: Statistics) {

  //   if (!data.count) return;

  //   if (this.dateFilter) {
  //     const oneDate = [{ date: data["date"], quantity: data['quantity'], count: data['count'], users: data['users'] }];
  //     const csvExporter = new ExportToCsv(this.setOptionCSV(data.date + " - Loyalty Offer: " + this.offer.title));
  //     csvExporter.generateCsv(oneDate);
  //   } else {
  //     const byDate = data['byDate'].map(obj => ({ date: (obj.date).toString(), quantity: obj.quantity, count: obj.count, users: obj.users }))
  //       .sort((a, b) => a.date.localeCompare(b.date));
  //     const total =
  //       [
  //         { date: 'total', quantity: data['quantity'], count: data['count'], users: data['users'] },
  //         { date: '', amount: '', users: '', count: '' },

  //       ];

  //     const csvExporter = new ExportToCsv(this.setOptionCSV("Loyalty Offer: " + this.offer.title));
  //     csvExporter.generateCsv(total.concat(byDate));
  //   }
  // }
}
