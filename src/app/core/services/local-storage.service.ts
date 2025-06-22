import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorageKeys = environment.localStorageKeys;

  constructor() { }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    for(let key in this._localStorageKeys)
      this.removeItem(key);
  }
}
