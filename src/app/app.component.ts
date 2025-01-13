
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from './services/custom-translate.service';
import { StorageLanguage } from './shared/models/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    imports: [
      RouterModule,
      CommonModule,
      FormsModule,
      ToolbarModule,
      ButtonModule,
      MessageModule,
      InputTextModule,
      CheckboxModule,
    ]
})
export class AppComponent {
  text = '';
  currentRoute: string = '';

  msg = '';

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }

  constructor(private router: Router, private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.use('en');
    this.translateService.setDefaultLang("en");
    }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
    }
}
