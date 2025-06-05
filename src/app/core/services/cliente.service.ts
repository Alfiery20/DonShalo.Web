import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ObtenerClienteDocResponse } from '../models/Cliente/ObtenerClienteDoc/ObtenerClienteDocResponse';
import { constants } from '../models/utils/contants';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerClientePorDoc(termino: string): Observable<ObtenerClienteDocResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Cliente/obtenerClienteDoc/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ObtenerClienteDocResponse>(uri, { headers: headers });
  }
}
