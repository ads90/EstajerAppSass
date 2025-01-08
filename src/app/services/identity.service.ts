import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EMPTY, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { StorageKey } from '../shared/constants/storage-key';
import { ApiResponse } from '../shared/models/api-response';
import { ServerEndPoint } from '../shared/models/enum';
import { environment } from '../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private permissions: any[] = [];
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router) { }

  refreshToken() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const body = {
        token: tokenization.token,
        refreshToken: tokenization.refreshToken
      };
      return this.http.post(environment.apiUrl + '' + ServerEndPoint.Refresh, body, {
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          ;
          if (!res.ok) {
            return throwError(() => res);
          }
          this.storageService.set(StorageKey.Tokenization, res.body.data);
          return EMPTY;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
    } else {
      return throwError(() => 'Unable to create token');
    }
  }

  setupUserPermission(): Promise<ApiResponse> {
    return new Promise((resolve) => {
      const tokenization = this.storageService.get(StorageKey.Tokenization);
      if (tokenization && tokenization.token && tokenization.refreshToken) {
        const url = environment.apiUrl + ServerEndPoint.Permission;
        this.http.get<ApiResponse>(url, { observe: 'response' }).subscribe({
          next: response => {
            const responseData = response.body;
            if (!responseData || !responseData.isSucceeded) {
              console.log(responseData);
            } else {
              this.permissions.push(...responseData.data);
            }
            resolve(responseData as ApiResponse);
          },
          error: err => {
            resolve(err);
          },
          complete: () => {
            console.log('Request completed');
          }
        });
      } else {
        const res = { isSucceeded: false, message: '', errorCode: 0, data: null } as ApiResponse;
        resolve(res);
      }
    });
  }

  logout() {
    this.storageService.clearAllStorage();
    this.router.navigate(['/login']);
  }


  get getUserId() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenization.token);
      return decodedToken.user_id;
    }
    return null;
  }

  get isLoggedIn() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      return true;
    }
    return false;
  }

  get getUserDefaultlanguage() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenization.token);
      return decodedToken.defaultlanguage;
    }
    return null;
  }

  get getRole() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenization.token);
      return decodedToken.role;
    }
    return null;
  }

  get getPermissions() {
    return this.permissions;
  }

  get getUserFullName() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenization.token);
      return decodedToken.nameid;
    }
    return null;
  }
  get getUserAccountName() {
    ;
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenization.token);
      return decodedToken.store_name;
    }
    return null;
  }

  get getUserAccountId() {
    const tokenization = this.storageService.get(StorageKey.Tokenization);
    if (tokenization && tokenization.token && tokenization.refreshToken) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(tokenization.token);
      return decodedToken.account_id;
    }
    return null;
  }

}
