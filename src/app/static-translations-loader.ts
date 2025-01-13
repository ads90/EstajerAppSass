import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import * as TranslationsAR from '../../public/i18n/ar.json';
import * as TranslationsEN from '../../public/i18n/en.json';

const TRANSLATIONS: TranslationObject = {
    en: TranslationsEN,
    ar: TranslationsAR
};

export class StaticTranslationLoader implements TranslateLoader {
    public getTranslation(lang: string): Observable<TranslationObject> {
        const translation = TRANSLATIONS[lang];
        if (translation) {
            return of(translation);
        } else {
            console.error(`Unknown language: ${lang}`);
            return of({});
        }
    }
}