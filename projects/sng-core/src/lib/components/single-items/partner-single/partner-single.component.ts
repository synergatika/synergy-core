import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Models & Interfaces
 */
import { Partner, ContactList, GeneralList } from '../../../model';
import { IStaticDataService } from '../../../services';

@Component({
  selector: 'sng-partner-single',
  templateUrl: './partner-single.component.html',
  styleUrls: ['./partner-single.component.scss']
})
export class PartnerSingleComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;
  public contactsList: ContactList[] = [];
  public sectorsList: GeneralList[];
  public sector: string = '';
public avatar: string = '';

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   */
  constructor(
    private staticDataService: IStaticDataService
  ) {
    this.contactsList = this.staticDataService.getContactsList;
    this.sectorsList = this.staticDataService.getSectorsList;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    console.log('Partner in SinglePartner', this.partner);
    this.sector = this.transformSector(this.partner);
    console.log(this.sector);
    this.contactsList = this.transformContacts(this.partner);
    this.avatar = this.partner.imageURL || '../../../../assets/media/users/default.jpg';
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  transformSector(partner: Partner) {
    const sector: string = this.sectorsList.filter((el) => {
      return el.value == partner.sector
    })[0].title;

    return sector;
  }

  transformContacts(partner: Partner) {
    const currentContactsArray = (this.partner.contacts).map(a => a.slug);
    const validateContactsList = this.contactsList.filter(function(el) {
      return currentContactsArray.includes(el.slug);
    });

    return validateContactsList.map(o => { return { ...o, value: (this.partner.contacts).filter(ob => { return ob.slug === o.slug })[0].value } });
  }

  scrollTo(selectorName: string): void {
    document.getElementById(selectorName).scrollIntoView();
  }
}
