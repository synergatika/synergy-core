import { Locale, LanguageFlag } from '../model';

export abstract class ITranslationService {

  abstract setLanguage(lang: string): void;

  abstract getSelectedLanguage(): string;

  abstract loadTranslations(...args: Locale[]): void;

  abstract getAvailableLanguages(): LanguageFlag[];
}
