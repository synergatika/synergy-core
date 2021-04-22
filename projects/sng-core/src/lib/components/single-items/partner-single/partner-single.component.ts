import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Models & Interfaces
 */
import { Partner, ContactList, GeneralList, Sector } from '../../../model';
import { IContentService, IStaticDataService } from '../../../services';

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
  public sectorList$: Observable<Sector[]>;

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   */
  constructor(
    private staticDataService: IStaticDataService,
    private contentService: IContentService
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
    // this.sectorList$ = this.contentService.readSectors();

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

  transformContacts(partner: Partner) {
    const currentContactsArray = (this.partner.contacts).map(a => a.slug);
    const validateContactsList = this.contactsList.filter(function (el) {
      return currentContactsArray.includes(el.slug);
    });

    return validateContactsList.map(o => { return { ...o, value: (this.partner.contacts).filter(ob => { return ob.slug === o.slug })[0].value } });
  }

  scrollTo(selectorName: string): void {
    document.getElementById(selectorName).scrollIntoView();
  }
}
