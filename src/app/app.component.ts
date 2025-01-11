
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    imports: [
      TranslateModule,
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

  constructor(private router: Router, private primeng: PrimeNG, private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    // this.appState.update((state) => ({ ...state, primary: "yellow" }));
    // this.primeng.theme.set({
    //     preset: Aura,
    //         options: {
    //             cssLayer: {
    //                 name: 'primeng',
    //                 order: 'primeng'
    //             }
    //         }
    //     })
    }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }
}
