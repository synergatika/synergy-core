import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'sng-share-icon',
  templateUrl: './share-icon.component.html',
  styleUrls: ['./share-icon.component.scss']
})
export class ShareIconComponent {

  /**
   * Imported Variables
   */
  @Input() item: any;

  /**
   * Other ariables
   */
  public showNav = false;
  public shareUrl : string;

  constructor() {
    this.unsubscribe = new Subject();
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    console.log(this.item);
    this.shareUrl = "https://synergatika.gr/"+this.item.type+"/"+this.item.slug
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;

  }

  openShare() {
    if (navigator.share) {
      navigator.share({
        title: this.item.title,
        url:   this.shareUrl,
      }).then(() => {
        //Nothing
      })
        .catch(console.error);
    } else {
      this.showNav = true;
    }
  }

}
