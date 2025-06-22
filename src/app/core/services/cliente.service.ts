import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObtenerClienteDocResponse } from '../models/Cliente/ObtenerClienteDoc/ObtenerClienteDocResponse';
import { VerClienteResponse } from '../models/Cliente/VerCliente/VerClienteResponse';
import { AgregarClienteRequest } from '../models/Cliente/AgregarCliente/AgregarClienteRequest';
import { AgregarClienteResponse } from '../models/Cliente/AgregarCliente/AgregarClienteResponse';
import { EditarClienteRequest } from '../models/Cliente/EditarCliente/EditarClienteRequest';
import { EditarClienteResponse } from '../models/Cliente/EditarCliente/EditarClienteResponse';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends Api {

  ObtenerClientePorDoc(termino: string): Observable<ObtenerClienteDocResponse> {
    const uri = `${this.url}/Cliente/obtenerClienteDoc/${termino}`;
    const headers = this._headers;
    return this.http.get<ObtenerClienteDocResponse>(uri, { headers: headers });
  }

  VerCliente(termino: number): Observable<VerClienteResponse> {
    const uri = `${this.url}/Cliente/verCliente/${termino}`;
    const headers = this._headers;
    return this.http.get<VerClienteResponse>(uri, { headers: headers });
  }

  AgregarCliente(cliente: AgregarClienteRequest): Observable<AgregarClienteResponse> {
    const uri = `${this.url}/Cliente/registrarCliente`;
    const headers = this._headers;
    return this.http.post<AgregarClienteResponse>(uri, cliente, { headers: headers });
  }

  EditarCliente(cliente: EditarClienteRequest): Observable<EditarClienteResponse> {
    const uri = `${this.url}/Cliente/editarCliente`;
    const headers = this._headers;
    return this.http.put<EditarClienteResponse>(uri, cliente, { headers: headers });
  }
}
