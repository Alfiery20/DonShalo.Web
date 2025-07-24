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

  getItem(key: string): object | string | null {
    const item: any = localStorage.getItem(key);
    console.log("CHECK ITEM", item)
    if(item == null) return null;

    try{
      const p = JSON.parse(item);
      if(typeof p == 'object' && p !== null)
        return p;

      return item;
    }
    catch(e)
    {
      return item;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    Object.keys(this._localStorageKeys)
    .forEach( k => {
      const v = this._localStorageKeys[k as keyof typeof this._localStorageKeys]
      this.removeItem(v);
    } )
  }
}
