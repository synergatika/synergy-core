import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

/**
 * Services
 */
import {
  IStaticDataService,
  IPartnersService,
  IEnvironmentService
} from '../../../services';


/**
 * Models & Interfaces
 */
import { Marker, Partner } from '../../../model';


@Component({
  selector: 'sng-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() partner_id: string;

  /**
   * Configuration and Static Data
   */
  public openUrl: string = this.enviromentService.openUrl;

  // singlePartner: boolean = false;
  // list: any;

  latitude: number = this.enviromentService.mapOptions.latitude;
  longitude: number = this.enviromentService.mapOptions.longitude;
  zoom: number = this.enviromentService.mapOptions.zoom;
  loading = false;

  markers: Marker[] = new Array();

  public partner: Partner;
  // public partners: Partner[];

  private unsubscribe: Subject<any>;

  /**
   * Map Variables
   */
  mapStyle = [];
  pin = {};

  constructor(
    private cdRef: ChangeDetectorRef,
    private staticDataService: IStaticDataService,
    private partnersService: IPartnersService,
    private enviromentService: IEnvironmentService,
  ) {
    this.mapStyle = this.staticDataService.getMapPinStyle.mapStyle;
    this.pin = this.staticDataService.getMapPinStyle.pin;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchPartnerData(this.partner_id);
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  addressToMap(partner: Partner): any {
    return {
      lat: parseFloat(partner.address.coordinates[0]),
      lng: parseFloat(partner.address.coordinates[1]),
      img: partner.imageURL,
      name: partner.name,
      slug: partner.slug,
      address: `${partner.address.street}, ${partner.address.city}`,
      // label: '0',
      draggable: false
    };
  }

  /**
   * Fetch Partner Data
   */
  fetchPartnerData(partnerId: string): void {
    this.partnersService.readPartnerInfo(partnerId)
      .pipe(
        tap(
          data => {
            this.partner = data;
            console.log('Partner in Map Widget', this.partner);

            if (this.partner.address) {
              this.markers = [this.addressToMap(this.partner)];
              this.latitude = this.markers[0].lat;
              this.longitude = this.markers[0].lng;
              this.zoom = 15;
            }
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
}
