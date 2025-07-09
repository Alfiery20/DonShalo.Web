import { inject } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

export class Api {
  protected http: HttpClient = inject(HttpClient);
  
  protected localStorageService = inject(LocalStorageService);
  protected localStorageKeys = env.localStorageKeys;

  protected url = env.apps_url.api;

  protected get _headers(){
    const token = this.localStorageService.getItem(this.localStorageKeys.TOKEN);
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
}
