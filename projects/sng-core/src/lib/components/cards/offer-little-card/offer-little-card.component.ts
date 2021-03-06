import { Component, OnInit, Input } from '@angular/core';
import { LoyaltyOffer } from '../../../model';

@Component({
  selector: 'sng-offer-little-card',
  templateUrl: './offer-little-card.component.html',
  styleUrls: ['./offer-little-card.component.scss']
})
export class OfferLittleCardComponent implements OnInit {
  @Input() offer: LoyaltyOffer;
  @Input() type: string;

  seconds = 0;

  constructor() { }

  ngOnInit(): void {
    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());
  }

}
