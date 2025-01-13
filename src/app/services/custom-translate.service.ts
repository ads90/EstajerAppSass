import { PrimeNG } from 'primeng/config';
import { Injectable, Inject, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { StorageKey } from '../shared/constants/storage-key';
import { StorageLanguage } from '../shared/models/enum';
import { ConstVaribale } from '../shared/models/language';
import { IdentityService } from './identity.service';
import { StorageService } from './storage.service';
import { AppConfigService } from './appconfigservice';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {
  
  configService = inject(AppConfigService);

  public ArabicIsDefaultLang: any;
  private currentLanguage: StorageLanguage = StorageLanguage.English;
  public globalDectionary: Record<string, string> = {
    error: '',
    success: '',
    accountInformation: '',
    internalServerError: '',
    unauthorized: '',
    wrongLogin: '',
    productAvailability: '',
  };

  constructor(
    private PrimeNG: PrimeNG,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private storageService: StorageService,
    private identityService: IdentityService
  ) {
    this.checkDefaultlanguage();
  }
  public translateInstant(key: string) {
    return this.translate.instant(key);
  }
  public getDefailtLanguageForCurrentUser() {
    var defaultlanguage = this.identityService.getUserDefaultlanguage;

    if (defaultlanguage != null) {
      this.currentLanguage =
        defaultlanguage == '0'
          ? StorageLanguage.Arabic
          : StorageLanguage.English;
      this.storageService.set(StorageKey.Language, this.currentLanguage);
      this.setLanguage(this.currentLanguage);
    }
  }

  public checkDefaultlanguage() {
    this.currentLanguage = this.storageService.get(StorageKey.Language);
    if (this.currentLanguage == null) {
      this.currentLanguage = StorageLanguage.English;
    }
    this.setLanguage(this.currentLanguage);
  }

  public setLanguage(lang: StorageLanguage) {
    this.currentLanguage = lang;
    this.storageService.set(StorageKey.Language, lang);
    this.translate.setDefaultLang(ConstVaribale.Language[lang]);
    this.translate.use(ConstVaribale.Language[lang]);
    const isArabicSelected = lang === StorageLanguage.Arabic
    this.configService.appState.update((state) => ({ ...state, RTL: isArabicSelected }));
    this.toggleRTL(isArabicSelected);
    
    //for primeng default component translation
    this.translate
      .get('primeng')
      .subscribe((res) => this.PrimeNG.setTranslation(res));

    this.setGlobalDictionary();
  }

  public checkLanguage(lang: StorageLanguage): boolean {
    return lang === this.currentLanguage;
  }

  public isArabic(): boolean {
    if (StorageLanguage.Arabic == this.currentLanguage) {
      this.ArabicIsDefaultLang = true;
      return true;
    } else {
      this.ArabicIsDefaultLang = false;
      return false;
    }
  }

  public getkeyName(key: string): Promise<string> {
    return new Promise((Name) => {
      this.translate.get(key).subscribe((nameData) => {
        Name(nameData);
      });
    });
  }

  public getArraykeysName(key: Array<string>): Promise<Array<string>> {
    return new Promise((Name) => {
      this.translate.get(key).subscribe((nameData) => {
        Name(nameData);
      });
    });
  }

  public fillDictionary(
    dictionary: Record<string, string>
  ): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(dictionary); // Get keys of the dictionary
      const values = keys.map((key) => dictionary[key]); // Get corresponding values

      this.getArraykeysName(values)
        .then((translatedValues) => {
          keys.forEach((key, index) => {
            dictionary[key] = translatedValues[index]; // Map translated values back to dictionary
          });
          resolve(dictionary);
        })
        .catch((err) => {
          console.error('Error while filling dictionary:', err);
          reject(err);
        });
    });
  }

  public setGlobalDictionary(): Promise<void> {
    return new Promise((resolve, reject) => {
      for (const key in this.globalDectionary) {
        if (Object.prototype.hasOwnProperty.call(this.globalDectionary, key)) {
          this.globalDectionary[key] = key;
        }
      }

      this.fillDictionary(this.globalDectionary)
        .then(() => resolve())
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  private toggleRTL(value: boolean) {
    const htmlElement = document.documentElement;

    if (value) {
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.removeAttribute('dir');
    }
  }

  private initialize(): Promise<boolean> {
    this.setGlobalDictionary()
      .then((languageTranslate) => {
        console.log('Translate API loaded');
      })
      .catch((err) => {
        console.error(err);
      });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
  }
}
