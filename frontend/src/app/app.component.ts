import { Component } from '@angular/core';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  template: '<app-toast></app-toast><router-outlet></router-outlet>',
  standalone: false
})
export class AppComponent {
  constructor(private readonly _languageService: LanguageService) {}
}
