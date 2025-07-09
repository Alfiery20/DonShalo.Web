import { Injectable } from '@angular/core';
import { ObtenerMenuRequest } from '../models/Autorizacion/obtenerMenu/ObtenerMenuRequest';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService extends Api {
  ObtenerMenus() {
    var uri = `${this.url}/Autorizacion/obtenerMenu`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMenuRequest>>(uri, { headers: headers });
  }
}
