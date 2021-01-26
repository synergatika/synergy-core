import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../../../model';

@Component({
  selector: 'sng-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;
  @Input() type: string; // single (one partner), all (many partners), internal (belongs to partenr)

  public hasExpired: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const now = new Date();
    const seconds = parseInt(now.getTime().toString());

    this.hasExpired = this.offer.expiresAt < seconds;
  }

}
