import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

/**
 * Services
 */
import { IItemsService } from '../../../services';

/**
 * Models & Interfaces
 */
import { PostEvent } from '../../../model';

@Component({
  selector: 'sng-posts_events-list-scroll',
  templateUrl: './posts_events-list-scroll.component.html',
  styleUrls: ['./posts_events-list-scroll.component.scss']
})
export class PostsEventsListScrollComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partenr)

  /**
   * Children Modals
   */
  @ViewChild('postEventModal') postEventModal: NgbModal;

  /**
   * Content Variables
   */
  public posts_events: PostEvent[] = [];
  post_event: PostEvent;

  counter: number = 0;
  scroll: number = 6;
  moved: boolean;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  /**
   * Component Constructor
   *
   * @param cdRef: ChangeDetectorRef
   * @param translate: TranslateService
   * @param partnersService: PartnersService
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    public translate: TranslateService,
    private itemsService: IItemsService
  ) {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.fetchPostsEventsData(this.counter);
  }

  /**
   * On destroy
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
   * Fetch Post & Events List
   */
  fetchPostsEventsData(counter: number): void {
    this.itemsService.readAllPrivatePostsEvents(`${this.scroll.toString()}-${counter.toString()}-0`)
      .pipe(
      tap(
        data => {
          this.posts_events = this.posts_events.concat(data);
          //console.log("Posts/Events in List-Scroll", this.posts_events);
        },
        () => {
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
   * On Scroll
   */
  onScroll(): void {
    this.counter = this.counter + 1;
    this.fetchPostsEventsData(this.counter);
    //console.log('scrolled!!');
    this.cdRef.markForCheck();
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
