import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ObtenerClienteDocResponse } from '../models/Cliente/ObtenerClienteDoc/ObtenerClienteDocResponse';
import { constants } from '../models/utils/contants';
import { VerClienteResponse } from '../models/Cliente/VerCliente/VerClienteResponse';
import { AgregarClienteRequest } from '../models/Cliente/AgregarCliente/AgregarClienteRequest';
import { AgregarClienteResponse } from '../models/Cliente/AgregarCliente/AgregarClienteResponse';
import { EditarClienteRequest } from '../models/Cliente/EditarCliente/EditarClienteRequest';
import { EditarClienteResponse } from '../models/Cliente/EditarCliente/EditarClienteResponse';

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

  VerCliente(termino: number): Observable<VerClienteResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Cliente/verCliente/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<VerClienteResponse>(uri, { headers: headers });
  }

  AgregarCliente(cliente: AgregarClienteRequest): Observable<AgregarClienteResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Cliente/registrarCliente`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarClienteResponse>(uri, cliente, { headers: headers });
  }

  EditarCliente(cliente: EditarClienteRequest): Observable<EditarClienteResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Cliente/editarCliente`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarClienteResponse>(uri, cliente, { headers: headers });
  }
}
