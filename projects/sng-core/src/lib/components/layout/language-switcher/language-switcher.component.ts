import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';
// Translate
import { ITranslationService } from '../../../services/translation.interface';

import { LanguageFlag } from '../../../model';

@Component({
  selector: 'sng-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  language: any;
  iconType: any;
  languages: LanguageFlag[];

  constructor(
    private translationService: ITranslationService,
    private router: Router
  ) {
    this.languages = translationService.getAvailableLanguages();
  }

  ngOnInit(): void {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  /**
   * Set language
   *
   * @param lang: string
   */
  setLanguage(lang: string): void {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
  }

  /**
   * Set selected language
   */
  setSelectedLanguage(): void {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
