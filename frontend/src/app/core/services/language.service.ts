import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translations } from '../i18n/translations';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly availableLanguages = ['es', 'en'];

  constructor(private readonly translateService: TranslateService) {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('es');
    this.translateService.setTranslation('es', translations.es);
    this.translateService.setTranslation('en', translations.en);
    this.translateService.use('es');
  }

  get currentLanguage(): string {
    return this.translateService.currentLang || this.translateService.defaultLang || 'es';
  }

  setLanguage(language: string): void {
    if (this.availableLanguages.includes(language)) {
      this.translateService.use(language);
    }
  }
}
