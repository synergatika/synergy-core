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
    this.fetchLoyaltyStatistics();
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

    return d.getFullYear().toString() + "/" + month + "/" + date;
  }

  activeDates(d: Date): boolean {
    return this.validatedDates.includes(this.dateformat(d));
  }

  applyFilterDate(event) {
    this.statisticsEarn = this.statistics.statisticsEarn.byDate.filter(obj =>
      obj.date === this.dateformat(event.value))[0];
    this.statisticsRedeem = this.statistics.statisticsRedeem.byDate.filter(obj =>
      obj.date === this.dateformat(event.value))[0];
  }

  clearFilterDate() {
    this.dateFilter = null;
    this.statisticsEarn = this.statistics.statisticsEarn;
    this.statisticsRedeem = this.statistics.statisticsRedeem;
  }

  /**
   * Fetch Loyalty Statistics
   */ 
  fetchLoyaltyStatistics() {
    this.loyaltyService.readStatistics()
      .pipe(
      tap(
        data => {
          this.statistics = data;
          const datesRedeem = (this.statistics.statisticsRedeem) ? this.statistics.statisticsRedeem.byDate.map(obj => { return obj.date }) : [];
          const datesEarn = (this.statistics.statisticsEarn) ? this.statistics.statisticsEarn.byDate.map(obj => { return obj.date }) : [];
          this.validatedDates = datesRedeem.concat(datesEarn);
          this.statisticsEarn = (this.statistics.statisticsEarn) ? this.statistics.statisticsEarn : { amount: 0, users: 0, count: 0 };
          this.statisticsRedeem = (this.statistics.statisticsRedeem) ? this.statistics.statisticsRedeem : { amount: 0, users: 0, count: 0 };
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

  setOptionCSV(title: string) {
    return {
      fieldSeparator: ',',
      filename: title,
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      // showTitle: true,
      // title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      //  useKeysAsHeaders: true,
      headers: ['Date', 'Amount', 'Total Transactions', 'Unique Users']//<-- Won't work with useKeysAsHeaders present!
    };
  }

  exportToCSV(data: Statistics, type: string) {

    if (!data.count) return;

    if (this.dateFilter) {
      const oneDate = [{ date: data["date"], amount: data['amount'], count: data['count'], users: data['users'] }];
      const csvExporter = new ExportToCsv(this.setOptionCSV(data.date + " - Total Loyalty (" + type + ")"));
      csvExporter.generateCsv(oneDate);
    } else {
      const byDate = data['byDate'].map(obj => ({ date: (obj.date).toString(), amount: obj.amount, count: obj.count, users: obj.users }))
      const total =
        [
          { date: 'total', amount: data['amount'], count: data['count'], users: data['users'] },
          { date: '', amount: '', count: '', users: '', },
        ];

      const csvExporter = new ExportToCsv(this.setOptionCSV("Total Loyalty (" + type + ")"));
      csvExporter.generateCsv(total.concat(byDate));
    }

  }
}
