import { Component, OnInit, Input } from '@angular/core';

/**
  * Services
  */
import { IContentService, IStaticDataService } from '../../../services';

/**
  * Models & Interfaces
  */
import { Partner, GeneralList, Sector } from '../../../model';
import { Observable } from 'rxjs';

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
  public avatar: string = '';

  public sectorList$: Observable<Sector[]>;

  constructor(
    private staticDataService: IStaticDataService,
    private contentService: IContentService
  ) {
    // this.sectorsList = this.staticDataService.getSectorsList;
  }

  // transformSector(partner: Partner) {
  //   this.sectorList$ = this.contentService.readSectors();

  //   // const sector: string = this.sectorsList.filter((el) => {
  //   //   return el.value == partner.sector
  //   // })[0].title;

  //   // return sector;
  // }

  ngOnInit(): void {
  //  this.sectorList$ = this.contentService.readSectors();
    // this.sector = this.transformSector(this.partner);
    this.avatar = this.partner.imageURL || '../../../../assets/media/users/default.jpg';
  }

}
