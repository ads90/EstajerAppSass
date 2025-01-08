import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { PrimeNG } from 'primeng/config';
import { StorageService } from './storage.service';
import { StorageLanguage } from '../shared/models/enum';
import { IdentityService } from './identity.service';
import { StorageKey } from '../shared/constants/storage-key';
import { ConstVaribale } from '../shared/models/language';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  public ArabicIsDefaultLang = false;
  private currentLanguage: StorageLanguage | undefined;
  public globalDectionary:{ [id: string]: any} = {
    error: '',
    success: '',
    accountInformation: '',
    internalServerError: '',
    unauthorized: '',
    wrongLogin: '',
    productAvailability: '',
    statusEnum1: '',
    statusEnum0: '',
    storeStatus0: '',
    storeStatus1: '',
    storeStatus2: '',
    storeStatus3: '',
    userStatus0: '',
    userStatus1: '',
    userStatus2: '',
    userStatus3: '',
    userRole1: '',
    userRole2: '',
    userRole3: '',
    userRole4: ''
  };

  constructor(
    private config: PrimeNG,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private storageService: StorageService,
    private identityService: IdentityService) {
  }
  public translateInstant(key:string) 
  {
   return this.translate.instant(key);
  }

  public getDefaultLanguageForCurrentUser() {
    var defaultlanguage = this.identityService.getUserDefaultlanguage;
    if (defaultlanguage != null) {
      this.currentLanguage = defaultlanguage === "0" ? StorageLanguage.Arabic : StorageLanguage.English;
      this.storageService.set(StorageKey.Language, this.currentLanguage);
      this.setLanguage(this.currentLanguage);
    } else {
      this.setLanguage(StorageLanguage.Arabic);
    }
  }

  public checkDefaultlanguage() {
    this.currentLanguage = this.storageService.get(StorageKey.Language);
    if (this.currentLanguage == null) {
      this.currentLanguage = StorageLanguage.Arabic;
    }
    this.setLanguage(this.currentLanguage);
  }

  public checkDirection() {
    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = this.isArabic ? "rtl" : "ltr";
    this.changeCssFile(this.isArabic ? "ar" : "en");
  }


  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      "head"
    )[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById(
      "langCss"
    ) as HTMLLinkElement;

    // let bundleName = lang === "ar" ? "css/classic-ar.css" : "css/classic.css";
    let bundleName = "css/theme.css";

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }

  public setLanguage(lang: StorageLanguage) {
    this.currentLanguage = lang;
    this.storageService.set(StorageKey.Language, lang);
    this.translate.setDefaultLang(ConstVaribale.Language[lang]);
    this.translate.use(ConstVaribale.Language[lang]);

    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));

    this.setGlobalDictionary();
    this.checkDirection();
  }

  public checkLanguage(lang: StorageLanguage): boolean {
    return lang === this.currentLanguage;
  }


  public get isArabic(): boolean {
    if (StorageLanguage.Arabic == this.currentLanguage) {
      this.ArabicIsDefaultLang = true;
      return true;
    } else {
      this.ArabicIsDefaultLang = false;
      return false;
    }
  }

  public get direction(): string {
    return this.isArabic ? "rtl" : "ltr";
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

  public fillDictionary(dictionary: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const arr = [];
      // tslint:disable-next-line:forin
      for (const prop in dictionary) {
        arr.push(dictionary[prop]);
      }
      this.getArraykeysName(arr).then((res: { [id: string]: any }) => {
        // tslint:disable-next-line:forin
        for (const prop in dictionary) {
          dictionary[prop] = res[prop];
        }
        resolve(res);
      }).catch(reject);
    });
  }

  public setGlobalDictionary(): Promise<any> {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:forin
      for (const key in this.globalDectionary) {
        this.globalDectionary[key] = key;
      }
      this.fillDictionary(this.globalDectionary).then(resolve).catch(err => {
        console.error(err);
      });
    });
  }

  initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.currentLanguage = StorageLanguage.Arabic;
      this.storageService.set(StorageKey.Language, this.currentLanguage);
      this.translate.setDefaultLang(ConstVaribale.Language[this.currentLanguage]);
      this.translate.use(ConstVaribale.Language[this.currentLanguage]);
      this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
      this.checkDirection();
      this.setGlobalDictionary().then(languageTranslate => {
        console.log('Translate API loaded');
        return resolve(true);
      }).catch(err => {
        console.error(err);
      });
    });
  }
}
