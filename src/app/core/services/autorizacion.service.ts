import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { constants } from '../models/utils/contants';
import { ObtenerMenuRequest } from '../models/Autorizacion/obtenerMenu/ObtenerMenuRequest';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  constructor
    (
      private http: HttpClient,
      private localService: LocalStorageService
    ) { }

  ObtenerMenus() {
    var uri = `${constants.apiUrl}/Autorizacion/obtenerMenu`;
    var token = this.localService.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<Array<ObtenerMenuRequest>>(uri, { headers: headers });
  }
}
