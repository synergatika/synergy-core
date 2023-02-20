import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ExportToCsv } from 'export-to-csv';

/**
 * Services
 */
import { Statistics } from '../../../model';
import { ILoyaltyService } from '../../../services';

@Component({
  selector: 'sng-loyalty-statistics',
  templateUrl: './loyalty-statistics.component.html',
  styleUrls: ['./loyalty-statistics.component.scss']
})
export class LoyaltyStatisticsComponent implements OnInit, OnDestroy {
  /**
   * Content Variables
   */
  public dateFilter: Date = null;
  public maxDate: Date;
  public statistics: any;//{ statisticsRedeem: Statistics, statisticsEarn: Statistics };
  public statisticsEarn: Statistics;
  public statisticsRedeem: Statistics;
  public validatedDates: string[];

  public total;
  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
    * Component Constructor
    *
    * @param cdRef: ChangeDetectorRef
    * @param loyaltyService: LoyaltyService
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
    this.maxDate = new Date();
    this.fetchLoyaltyStatistics('0');
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
    this.fetchLoyaltyStatistics(this.dateformat(event.value));
    // this.statisticsEarn = this.statistics.statisticsEarn.byDate.filter(obj =>
    //   obj.date === this.dateformat(event.value))[0];
    // this.statisticsRedeem = this.statistics.statisticsRedeem.byDate.filter(obj =>
    //   obj.date === this.dateformat(event.value))[0];
  }

  clearFilterDate() {
    this.dateFilter = null;
    this.statistics = this.total;
    // this.statisticsEarn = this.statistics['total'].earn;
    // this.statisticsRedeem = this.statistics['total'].redeem;
  }

  /**
   * Fetch Loyalty Statistics
   */
  fetchLoyaltyStatistics(_date: string) {
    this.loyaltyService.readLoyaltyStatistics(_date)
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

  exportToCSV(_type:string) {
    if(!this.statistics[_type] || !this.statistics[_type].uniqueTransactions.length) return;

    this.loyaltyService.exportLoyaltyStatistics(this.dateFilter ? this.dateformat(this.dateFilter) : '0', _type);
    // this.loyaltyService.exportLoyaltyStatistics(, _type)
    //   .pipe(
    //     tap(
    //       data => {
    //       },
    //       error => {
    //       }),
    //     takeUntil(this.unsubscribe),
    //     finalize(() => {
    //       this.loading = false;
    //       this.cdRef.markForCheck();
    //     })
    //   )
    //   .subscribe();
  
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
  //     headers: ['Date', 'Amount', 'Total Transactions', 'Unique Users']//<-- Won't work with useKeysAsHeaders present!
  //   };
  // }

  // exportToCSV(data: Statistics, type: string) {

  //   if (!data.count) return;

  //   if (this.dateFilter) {
  //     const oneDate = [{ date: data["date"], amount: data['amount'], count: data['count'], users: data['users'] }];
  //     const csvExporter = new ExportToCsv(this.setOptionCSV(data.date + " - Total Loyalty (" + type + ")"));
  //     csvExporter.generateCsv(oneDate);
  //   } else {
  //     const byDate = data['byDate'].map(obj => ({ date: (obj.date).toString(), amount: obj.amount, count: obj.count, users: obj.users }))
  //       .sort((a, b) => a.date.localeCompare(b.date));
  //     const total =
  //       [
  //         { date: 'total', amount: data['amount'], count: data['count'], users: data['users'] },
  //         { date: '', amount: '', count: '', users: '', },
  //       ];

  //     const csvExporter = new ExportToCsv(this.setOptionCSV("Total Loyalty (" + type + ")"));
  //     csvExporter.generateCsv(total.concat(byDate));
  //   }
  // }
}
