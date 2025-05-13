import { Injectable } from '@angular/core';
import { ObtenerRolResponse } from '../models/ObtenerRol/ObtenerRolResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObtenerPersonalResponse } from '../models/obtenerPersonal/obtenerPersonalResponse';
import { constants } from '../models/utils/contants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerRol(termino: string): Observable<Array<ObtenerRolResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/obtenerRoles/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerRolResponse>>(uri, { headers: headers });
  }

}
