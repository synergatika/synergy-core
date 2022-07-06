import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

/**
 * Services
 */
import {
  IStaticDataService,
  IItemsService,
  IEnvironmentService
} from '../../../services';

/**
 * Models & Interfaces
 */
import { Partner, PostEvent } from '../../../model';

@Component({
  selector: 'sng-posts_events-list-carousel',
  templateUrl: './posts_events-list-carousel.component.html',
  styleUrls: ['./posts_events-list-carousel.component.scss']
})
export class PostsEventsListCarouselComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partner)
  @Input() access: string;

  /**
   * Children Modals
   */
  @ViewChild('postEventModal') postEventModal: NgbModal;

  /**
   * Configuration and Static Data
   */
  public configAccess: Boolean[] = this.enviromentService.access;

  /**
   * Content Variables
   */
  public posts_events: PostEvent[];
  public post_event: PostEvent;

  /**
   * Carousel Variables
   */
  customOptions: OwlOptions;
  moved: boolean;

  private unsubscribe: Subject<any>;
  loading = false;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param modalService: NgbModal
   * @param translate: TranslateService
   * @param staticDataService: StaticDataService
   * @param itemsService: ItemsService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private staticDataService: IStaticDataService,
    private itemsService: IItemsService,
    private enviromentService: IEnvironmentService
  ) {
    this.customOptions = (this.type === 'single') ? this.staticDataService.getOwlOptionsTwo : this.staticDataService.getOwlOptionsThree;
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    console.log(this.access)
    if (this.type == 'single') {
      this.fetchStorePostsEventsData(this.partner._id);
    } else if (this.type == 'all') {
      this.fetchPostsEventsData();
    }
  }

  /**
   * On Destory
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Close Modal on Browser Back Button
   */
  controlModalState(state: boolean): void {
    if (state) {
      const modalState = {
        modal: true,
        desc: 'MemberExploreModals'
      };
      history.pushState(modalState, null);
    } else {
      if (window.history.state.modal) {
        history.back();
      }
    }
  }

  @HostListener('window:popstate')
  dismissModal(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
      this.controlModalState(false);
    }

  }

  /**
   * Fetch Posts & Events List
   */
  fetchPostsEventsData(): void {
    this.itemsService.readAllPrivatePostsEvents('0-0-0')
      .pipe(
        tap(
          data => {
            this.posts_events = data;
            //console.log("Posts/Events in List-Carousel", this.posts_events);
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

  /**
   * Fetch Posts & Events List (for One Partner)
   */
  fetchStorePostsEventsData(partnerId: string): void {
    this.itemsService.readPrivatePostsEventsByStore(partnerId, '0-0-0')
      .pipe(
        tap(
          data => {
            this.posts_events = data;
          },
          error => {
            console.log(error);
          }),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }

  /**
   * Open Partner Modal
   */
  openPostEvent(postEvent: PostEvent): void {
    this.post_event = postEvent;
    this.controlModalState(true);
    this.modalService.open(
      this.postEventModal,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
        backdropClass: 'fullscrenn-backdrop',
        backdrop: 'static',
        windowClass: 'fullscreen-modal',
      }
    )
      .result.then(
        () => { this.controlModalState(false); console.log('closed'); },
        () => { this.controlModalState(false); console.log('dismissed'); });
  }


  /**
   * Actions to Open Modals from Carousel
   */
  mousedown(): void { this.moved = false; }
  mousemove(): void { this.moved = true; }
  mouseup(data: PostEvent): void {
    if (!this.moved) {
      this.openPostEvent(data);
    }
    this.moved = false;
  }
}
