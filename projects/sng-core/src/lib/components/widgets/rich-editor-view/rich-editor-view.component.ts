import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { PostEvent } from '../../../model';

@Component({
  selector: 'sng-rich-editor-view',
  templateUrl: './rich-editor-view.component.html',
  styleUrls: ['./rich-editor-view.component.scss']
})
export class RichEditorViewComponent implements OnInit, OnDestroy {

  /**
   * Imported Variables
   */
  @Input() description: string;

  /**
   * Component Constructor
   */
  constructor() {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
  }
}
