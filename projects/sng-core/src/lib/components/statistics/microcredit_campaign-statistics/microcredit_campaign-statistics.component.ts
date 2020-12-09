import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../model';
import { Statistics } from '../../../model';

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
  public statisticsPromise: Statistics;
  public statisticsRedeem: Statistics;
  public validatedDates: string[];

  /**
    * Component Constructor
    */
  constructor() { }

  /**
    * On Init
    */
  ngOnInit() {
    this.maxDate = new Date();

    const datesRedeem = (this.campaign.statistics.redeemed) ? this.campaign.statistics.redeemed.byDate.map(obj => { return obj.date }) : [];
    const datesPromise = (this.campaign.statistics.earned) ? this.campaign.statistics.earned.byDate.map(obj => { return obj.date }) : [];
    this.validatedDates = datesRedeem.concat(datesPromise);
    this.statisticsPromise = (this.campaign.statistics.earned) ? this.campaign["statistics"].earned : { _id: "-1", count: 0, tokens: 0, users: 0 };
    this.statisticsRedeem = (this.campaign.statistics.redeemed) ? this.campaign["statistics"].redeemed : { _id: "-1", count: 0, tokens: 0, users: 0 };
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

    return d.getFullYear().toString() + "/" + month + "/" + date;
  }

  activeDates(d: Date): boolean {
    return this.validatedDates.includes(this.dateformat(d));
  }

  applyFilterDate(event) {
    this.statisticsPromise = this.campaign.statistics.earned.byDate.filter(obj =>
      obj.date === this.dateformat(event.value))[0];
    this.statisticsRedeem = this.campaign.statistics.redeemed.byDate.filter(obj =>
      obj.date === this.dateformat(event.value))[0];
  }

  clearFilterDate() {
    this.dateFilter = null;
    this.statisticsPromise = this.campaign.statistics.earned;
    this.statisticsRedeem = this.campaign.statistics.redeemed;
  }

  applyFilterText(event: Event) {
    this.dateFilter = null;
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

    if (this.dateFilter) {
      const oneDate = [{ date: data["date"], amount: data['tokens'], count: data['count'], users: data['users'] }];
      const csvExporter = new ExportToCsv(this.setOptionCSV(data.date + " - Microcredit Campaign: " + this.campaign.title + "(" + type + ")"));
      csvExporter.generateCsv(oneDate);
    } else {
      const byDate = data['byDate'].map(obj => ({ date: (obj.date).toString(), amount: obj.tokens, count: obj.count, users: obj.users }))
      const total =
        [
          { date: 'total', amount: data['tokens'], count: data['count'], users: data['users'] },
          { date: '', amount: '', users: '', count: '' },

        ];

      const csvExporter = new ExportToCsv(this.setOptionCSV("Microcredit Campaign: " + this.campaign.title + "(" + type + ")"));
      csvExporter.generateCsv(total.concat(byDate));
    }
  }


}
