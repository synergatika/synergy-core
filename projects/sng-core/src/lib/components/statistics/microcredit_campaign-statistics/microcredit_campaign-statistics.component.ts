import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../model';
import { Statistics } from '../../../model';
import { IMicrocreditService } from '../../../services';

@Component({
  selector: 'sng-microcredit_campaign-statistics',
  templateUrl: './microcredit_campaign-statistics.component.html',
  styleUrls: ['./microcredit_campaign-statistics.component.scss']
})
export class MicrocreditCampaignStatisticsComponent implements OnInit, OnDestroy {
  /**
   * Imported Variables
   */
  @Input() campaign: MicrocreditCampaign;

  /**
   * Content Variables
   */
  public maxDate: Date;
  public dateFilter: Date;
  // public statisticsPromise: Statistics;
  // public statisticsRedeem: Statistics;
  public validatedDates: string[];
  public statistics: any;

  public total;

  loading: boolean = false;
  private unsubscribe: Subject<any>;
  
  /**
    * Component Constructor
    */
  constructor(
    private cdRef: ChangeDetectorRef,
    private microcreditService: IMicrocreditService
  ) {
    this.unsubscribe = new Subject();
  }
  /**
    * On Init
    */
  ngOnInit() {
    console.log(this.campaign.tokens);
    this.maxDate = new Date();
    this.fetchCampaignStatistics('0');

  //   const datesRedeem = (this.campaign.statistics.redeemed) ? this.campaign.statistics.redeemed.byDate.map(obj => { return obj.date }) : [];
  //   const datesPromise = (this.campaign.statistics.earned) ? this.campaign.statistics.earned.byDate.map(obj => { return obj.date }) : [];
  //   this.validatedDates = datesRedeem.concat(datesPromise);
  //   this.statisticsPromise = (this.campaign.statistics.earned) ? this.campaign["statistics"].earned : { _id: "-1", tokens: 0, users: 0, count: 0 };
  //   this.statisticsRedeem = (this.campaign.statistics.redeemed) ? this.campaign["statistics"].redeemed : { _id: "-1", tokens: 0, users: 0, count: 0 };
  }

  /**
   * On Destroy
   */
  ngOnDestroy() { }

  dateformat(d: Date): string {
    let date: any; let month: any;

    if (d.getDate().toString().length < 2) {
      date = '0' + d.getDate().toString();
    } else {
      date = d.getDate().toString();
    }

    if ((d.getMonth() + 1).toString().length < 2) {
      month = '0' + (d.getMonth() + 1).toString();
    } else {
      month = (d.getMonth() + 1).toString();
    }

    // return d.getFullYear().toString() + "/" + month + "/" + date;
    return `${d.getFullYear().toString()}-${month}-${date}`;
  }

  activeDates(d: Date): boolean {
    return this.validatedDates.includes(this.dateformat(d));
  }

  applyFilterDate(event) {
    this.fetchCampaignStatistics(this.dateformat(event.value));

    // this.statisticsPromise = this.campaign.statistics.earned.byDate.filter(obj =>
    //   obj.date === this.dateformat(event.value))[0];
    // this.statisticsRedeem = this.campaign.statistics.redeemed.byDate.filter(obj =>
    //   obj.date === this.dateformat(event.value))[0];
  }

  clearFilterDate() {
    this.dateFilter = null;
    this.statistics = this.total;

    // this.statisticsPromise = this.campaign.statistics.earned;
    // this.statisticsRedeem = this.campaign.statistics.redeemed;
  }

  applyFilterText(event: Event) {
    this.dateFilter = null;
  }

  fetchCampaignStatistics(_date: string) {
    this.microcreditService.readCampaignStatistics(this.campaign.partner._id, this.campaign._id, _date)
      .pipe(
        tap(
          data => {
            this.statistics = data;
            console.log(this.statistics)

            if (_date === '0') this.total = data;
            this.validatedDates = this.total.dates;
            console.log(this.validatedDates)
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
    if(!this.statistics[_type] || !this.statistics[_type].uniqueSupports.length) return;

    this.microcreditService.exportCampaignStatistics(this.campaign.partner._id, this.campaign._id,this.dateFilter ? this.dateformat(this.dateFilter) : '0', _type);
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
  //     const oneDate = [{ date: data["date"], amount: data['tokens'], count: data['count'], users: data['users'] }];
  //     const csvExporter = new ExportToCsv(this.setOptionCSV(data.date + " - Microcredit Campaign: " + this.campaign.title + "(" + type + ")"));
  //     csvExporter.generateCsv(oneDate);
  //   } else {
  //     const byDate = data['byDate'].map(obj => ({ date: (obj.date).toString(), amount: obj.tokens, count: obj.count, users: obj.users }))
  //       .sort((a, b) => a.date.localeCompare(b.date));
  //     const total =
  //       [
  //         { date: 'total', amount: data['tokens'], count: data['count'], users: data['users'] },
  //         { date: '', amount: '', users: '', count: '' },

  //       ];

  //     const csvExporter = new ExportToCsv(this.setOptionCSV("Microcredit Campaign: " + this.campaign.title + "(" + type + ")"));
  //     csvExporter.generateCsv(total.concat(byDate));
  //   }
  // }


}
