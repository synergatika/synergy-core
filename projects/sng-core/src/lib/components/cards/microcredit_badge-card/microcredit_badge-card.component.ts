//Import Basic Services
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { tap, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { IStaticDataService, IContentService, IMicrocreditService } from '../../../services';

/**
 * Models & Interfaces
 */
import { Activity } from '../../../model';


@Component({
  selector: 'sng-microcredit_badge-card',
  templateUrl: './microcredit_badge-card.component.html',
  styleUrls: ['./microcredit_badge-card.component.scss']
})
export class MicrocreditBadgeCardComponent implements OnInit, OnDestroy {

	/**
	 * Content Variables
	 */
  public microcredit_badge: Activity; //The loyalty badge of member
  badgesImages: any;

  loading = false;
  private unsubscribe: Subject<any>;

	/**
	 * Component Constructor
	 *
	 * @param cdRef: ChangeDetectorRef
	 * @param translate: TranslateService
	 * @param contentService: ContentService
	 * @param microcreditService: MicrocreditService
	 */
  constructor(
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
    private staticDataService: IStaticDataService,
    private contentService: IContentService,
    private microcreditService: IMicrocreditService,
  ) {
    this.badgesImages = this.staticDataService.getBadgesImages;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchMicrocreditBadgeData();
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }


  /**
   * Fetch Microcredit Badge
   */
  fetchMicrocreditBadgeData(): void {
    this.microcreditService.readBadge()
      .pipe(
      tap(
        data => {
          this.microcredit_badge = data;
          console.log('Microcredit Badge Card', this.microcredit_badge);
          this.fetchBadgeContent();
        },
        error => {
          console.log(error);
        }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdRef.markForCheck();
      })
      )
      .subscribe();
  }

  fetchBadgeContent(): void {
    // Set Data for Badge based On Level
    switch (this.microcredit_badge.slug) {
      case 1:
        this.microcredit_badge.image = this.badgesImages.supporter;
        // this.badge.text_id = 5;
        this.microcredit_badge.text_id = 'Supporter';
        break;
      case 2:
        this.microcredit_badge.image = this.badgesImages.helper;
        // this.badge.text_id = 7;
        this.microcredit_badge.text_id = 'Helper';
        break;
      case 3:
        this.microcredit_badge.image = this.badgesImages.one_of_us;
        // this.badge.text_id = 9;
        this.microcredit_badge.text_id = 'One of Us';
        break;
    }
    // Get static content of Badge
    // this.contentService.readContentById(this.microcredit_badge.text_id)
    //   // this.staticContentService.readText(this.badge.text_id)
    //   .pipe(
    //   tap(
    //     data => {
    //       this.microcredit_badge.text = data;
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   ),
    //   takeUntil(this.unsubscribe),
    //   finalize(() => {
    //     this.loading = false;
    //     this.cdRef.markForCheck();
    //   })
    //   ).subscribe();
  }
}
