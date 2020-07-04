import { Component, OnInit, Input } from '@angular/core';

/**
 * Models & Interfaces
 */
import { PostEvent } from '../../../model';

@Component({
	selector: 'sng-post_event-card',
	templateUrl: './post_event-card.component.html',
	styleUrls: ['./post_event-card.component.scss']
})
export class PostEventCardComponent implements OnInit {

  /**
   * Imported Variables
   */
	@Input() post_event: PostEvent;
	@Input() type: string; // 'single' Or 'all'

	constructor() { }

	ngOnInit(): void {
	}

}
