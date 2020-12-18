import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

/**
 * Services
 */
import { Offer } from '../../../model';
import { Statistics } from '../../../model';

@Component({
  selector: 'sng-offer-statistics',
  templateUrl: './offer-statistics.component.html',
  styleUrls: ['./offer-statistics.component.scss']
})
export class OfferStatisticsComponent implements OnInit, OnDestroy {
  /**
   * Imported Variables
   */
  @Input() offer: Offer;

  /**
   * Content Variables
   */
  public dateFilter: Date;
  public maxDate: Date;
  public statistics: Statistics;
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

    console.log("Statistics in Loyalty Offer Statistics", this.offer.statistics);

    this.validatedDates = (this.offer.statistics) ? this.offer.statistics.byDate.map(obj => { return obj.date }) : [];
    this.statistics = (this.offer.statistics) ? this.offer["statistics"] : { _id: "-1", count: 0, tokens: 0, users: 0 };
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
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
    this.statistics = this.offer.statistics.byDate.filter(obj =>
      obj.date === this.dateformat(event.value))[0];
  }

  clearFilterDate() {
    this.dateFilter = null;
    this.statistics = this.offer.statistics;
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
      headers: ['Date', 'Quantity', 'Total Transactions', 'Unique Users']//<-- Won't work with useKeysAsHeaders present!
    };
  }

  exportToCSV(data: Statistics) {
    if (this.dateFilter) {
      const oneDate = [{ date: data["date"], quantity: data['quantity'], count: data['count'], users: data['users'] }];
      const csvExporter = new ExportToCsv(this.setOptionCSV(data.date + " - Loyalty Offer: " + this.offer.title));
      csvExporter.generateCsv(oneDate);
    } else {
      const byDate = data['byDate'].map(obj => ({ date: (obj.date).toString(), quantity: obj.quantity, count: obj.count, users: obj.users }))
      const total =
        [
          { date: 'total', quantity: data['quantity'], count: data['count'], users: data['users'] },
          { date: '', amount: '', users: '', count: '' },

        ];

      const csvExporter = new ExportToCsv(this.setOptionCSV("Loyalty Offer: " + this.offer.title));
      csvExporter.generateCsv(total.concat(byDate));
    }
  }
}
