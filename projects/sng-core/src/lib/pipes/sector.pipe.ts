import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sector } from '../model';

@Pipe({
  name: 'sector_filter',
  pure: false,
})
export class SectorFilterPipe implements PipeTransform {
  constructor(public translate: TranslateService) { }

  transform(value: string, args?: Sector[]): any {
    const lang = this.translate.currentLang;

if(args) {

    const sector: Sector = args.filter((o) => { return o._id == value })[0];
    if (sector) return sector[`${lang}_title`];
    else return '';
} else {
  return '';
}
  }
}
