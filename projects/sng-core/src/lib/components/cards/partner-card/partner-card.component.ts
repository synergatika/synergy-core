import { Component, OnInit, Input } from '@angular/core';

/**
 * Models & Interfaces
 */
import { Partner } from '../../../model';

@Component({
	selector: 'sng-partner-card',
	templateUrl: './partner-card.component.html',
	styleUrls: ['./partner-card.component.scss']
})
export class PartnerCardComponent implements OnInit {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;

  constructor() {

  }

  ngOnInit(): void {

  }

}
