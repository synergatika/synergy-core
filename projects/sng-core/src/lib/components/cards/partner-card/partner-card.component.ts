import { Component, OnInit, Input } from '@angular/core';

/**
  * Services
  */
import { IStaticDataService } from '../../../services';

/**
  * Models & Interfaces
  */
import { Partner, GeneralList } from '../../../model';

@Component({
  selector: 'sng-partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.scss']
})
export class PartnerCardComponent implements OnInit {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;
  public sectorsList: GeneralList[];
  public sector: string = '';

  constructor(
    private staticDataService: IStaticDataService
  ) {
    this.sectorsList = this.staticDataService.getSectorsList;
  }

  transformSector(partner: Partner) {
    const sector: string = this.sectorsList.filter((el) => {
      return el.value == partner.sector
    })[0].title;

    return sector;
  }

  ngOnInit(): void {
    this.sector = this.transformSector(this.partner);
  }

}
