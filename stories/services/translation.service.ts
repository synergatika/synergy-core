import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ITranslationService, LanguageFlag, Locale } from 'sng-core';

const translations: Locale = {
  lang: 'el',
  data: {
    MENU: {
      OFFERS: 'Offers',
      WALLET: 'Wallet',
      SUPPORT: 'Suppport',
      DISCOVER: 'Discover',
    }
  },
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService extends ITranslationService {

  private langIds: any = [];

  constructor(private translate: TranslateService) {
    super();

    // add new langIds to the list
    this.translate.addLangs(['el']);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('el');
    this.loadTranslations(translations);
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach(locale => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);

      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
  }
}
