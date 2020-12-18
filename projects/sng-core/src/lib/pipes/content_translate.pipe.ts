import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import Content from '../models/content.model';

@Pipe({
  name: 'content_translate',
  pure: false,
})
export class ContentTranslatePipe implements PipeTransform {
  constructor(public translate: TranslateService) { }

  transform(value: Content, args?: string): any {
    const lang = this.translate.currentLang;
    return value[`${lang}_${args}`];
  }
}
