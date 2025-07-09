import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarSucursalRequest } from '../models/Sucursal/agregarSucursal/agregarSucursalRequest';
import { AgregarSucursalResponse } from '../models/Sucursal/agregarSucursal/agregarSucursalResponse';
import { VerSucursalResponse } from '../models/Sucursal/verSucursal/verSucursalResponse';
import { EditarSucursalRequest } from '../models/Sucursal/editarSucural/editarSucuralRequest';
import { EditarSucursalResponse } from '../models/Sucursal/editarSucural/editarSucuralResponse';
import { EliminarSucursalResponse } from '../models/Sucursal/eliminarSucursal/eliminarSucursalResponse';
import { ObtenerMenuSucursalResponse } from '../models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { ObtenerSucursalResponse } from '../models/Sucursal/obtenerSucursal/ObtenerSucursalResponse';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class SucursalService extends Api {

  ObtenerSucursal(termino: string): Observable<Array<ObtenerSucursalResponse>> {
    const uri = `${this.url}/Sucursal/obtenerSucursal/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerSucursalResponse>>(uri, { headers: headers });
  }

  AgregarSucursal(sucursal: AgregarSucursalRequest): Observable<AgregarSucursalResponse> {
    const uri = `${this.url}/Sucursal/registrarSucursal`;
    const headers = this._headers;
    return this.http.post<AgregarSucursalResponse>(uri, sucursal, { headers: headers });
  }

  VerSucursal(id: number): Observable<VerSucursalResponse> {
    const uri = `${this.url}/Sucursal/verSucursal/${id}`;
    const headers = this._headers;
    return this.http.get<VerSucursalResponse>(uri, { headers: headers });
  }

  EditarSucursal(sucursal: EditarSucursalRequest): Observable<EditarSucursalResponse> {
    const uri = `${this.url}/Sucursal/editarSucursal`;
    const headers = this._headers;
    return this.http.put<EditarSucursalResponse>(uri, sucursal, { headers: headers });
  }

  EliminarSucursal(id: number): Observable<EliminarSucursalResponse> {
    const uri = `${this.url}/Sucursal/eliminarSucursal/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarSucursalResponse>(uri, { headers: headers });
  }

  ObtenerMenuSucursal(termino: string): Observable<Array<ObtenerMenuSucursalResponse>> {
    const uri = `${this.url}/Sucursal/obtenerMenuSucursal/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMenuSucursalResponse>>(uri, { headers: headers });
  }
}
