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
   * Other variables
   */
  public shareMobileFlag = false;
  public shareUrl: string;

  constructor() {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.shareUrl = "https://synergatika.gr/" + this.item.type + "/" + this.item.slug;
    if (navigator.share) {
      this.shareMobileFlag = true;
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
  }

  /**
   * Share for Mobile
   */
  shareMobile() {
    navigator.share({
      title: this.item.title,
      url: this.shareUrl,
    }).then(() => {
      //Nothing
    })
      .catch(console.error);
  }

}
