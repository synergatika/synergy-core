import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Content } from '../model';
import { IStaticContentService } from '../services';

@Pipe({
  name: 'content_translate',
  pure: false,
})
export class ContentTranslatePipe implements PipeTransform {
  private content: Content[];

  constructor(
    public translate: TranslateService,
     private staticContentService: IStaticContentService
  ) {
     this.content = this.staticContentService.content;
  }

  transform(value: string, args?: string): any {
    const lang = this.translate.currentLang;

    if (this.content) {
      const content: Content = this.content.filter((o) => { return o.name == value })[0];
      if (content) return content[`${lang}_${args}`];
      else return '';
    } else {
      return '';
    }
  }
}