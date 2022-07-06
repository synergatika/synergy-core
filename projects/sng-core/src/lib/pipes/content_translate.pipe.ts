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
    //console.log("Pipe")
    //console.log(this.content)
  }

  transform(value: string, args?: string): any {
    const lang = this.translate.currentLang;
    //console.log(this.content)
    if (this.content) {
      const content: Content = this.content.filter((o) => { return o.name == value })[0];
      if (content) return content[`${lang}_${args}`];
      else return '';
    } else {
      return '';
    }
  }

  // transform(value: Content, args?: string): any {
  //   const lang = this.translate.currentLang;
  //   return value[`${lang}_${args}`];
  // }
  // }
}
