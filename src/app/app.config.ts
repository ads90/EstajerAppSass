import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { routes } from './routes';
import Noir from './themes/app-theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { StaticTranslationLoader } from './static-translations-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: Noir, // default theme
    }),
    provideHttpClient(),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: StaticTranslationLoader, // todo , better not use Static Loader 
        // useFactory: httpLoaderFactory, // todo better use laoder factory
        deps: [HttpClient],
      },
    })
  ]),
  ],
};
