import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../models/utils/contants';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AgregarSucursalRequest } from '../models/Sucursal/agregarSucursal/agregarSucursalRequest';
import { AgregarSucursalResponse } from '../models/Sucursal/agregarSucursal/agregarSucursalResponse';
import { VerSucursalResponse } from '../models/Sucursal/verSucursal/verSucursalResponse';
import { EditarSucursalRequest } from '../models/Sucursal/editarSucural/editarSucuralRequest';
import { EditarSucursalResponse } from '../models/Sucursal/editarSucural/editarSucuralResponse';
import { EliminarSucursalResponse } from '../models/Sucursal/eliminarSucursal/eliminarSucursalResponse';
import { ObtenerMenuSucursalResponse } from '../models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { ObtenerSucursalResponse } from '../models/Sucursal/obtenerSucursal/ObtenerSucursalResponse';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerSucursal(termino: string): Observable<Array<ObtenerSucursalResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Sucursal/obtenerSucursal/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerSucursalResponse>>(uri, { headers: headers });
  }

  AgregarSucursal(sucursal: AgregarSucursalRequest): Observable<AgregarSucursalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Sucursal/registrarSucursal`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarSucursalResponse>(uri, sucursal, { headers: headers });
  }

  VerSucursal(id: number): Observable<VerSucursalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Sucursal/verSucursal/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerSucursalResponse>(uri, { headers: headers });
  }

  EditarSucursal(sucursal: EditarSucursalRequest): Observable<EditarSucursalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Sucursal/editarSucursal`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarSucursalResponse>(uri, sucursal, { headers: headers });
  }

  EliminarSucursal(id: number): Observable<EliminarSucursalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Sucursal/eliminarSucursal/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarSucursalResponse>(uri, { headers: headers });
  }

  ObtenerMenuSucursal(termino: string): Observable<Array<ObtenerMenuSucursalResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Sucursal/obtenerMenuSucursal/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerMenuSucursalResponse>>(uri, { headers: headers });
  }
}
