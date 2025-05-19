import { Injectable } from '@angular/core';
import { ObtenerRolResponse } from '../models/Rol/ObtenerRol/ObtenerRolResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObtenerPersonalResponse } from '../models/Personal/obtenerPersonal/obtenerPersonalResponse';
import { constants } from '../models/utils/contants';
import { LocalStorageService } from './local-storage.service';
import { AgregarRolRequest } from '../models/Rol/agregarRol/agregarRolRequest';
import { AgregarRolResponse } from '../models/Rol/agregarRol/agregarRolResponse';
import { EditarRolRequest } from '../models/Rol/editarRol/editarRolRequest';
import { EditarRolResponse } from '../models/Rol/editarRol/editarRolResponse';
import { EliminarRolResponse } from '../models/Rol/eliminarRol/eliminarRolResponse';
import { VerRolResponse } from '../models/Rol/verRol/verRolResponse';
import { ObtenerMenuRolResponse } from '../models/Rol/obtenerMenuRol/obtenerMenuRolResponse';
import { ObtenerMenuXRolResponse } from '../models/Rol/obtenerMenuXRol/obtenerMenuXRolResponse';
import { ActualizarPermisoRequest } from '../models/Rol/actualizarPermiso/actualizarPermisoRequest';
import { ActualizarPermisoResponse } from '../models/Rol/actualizarPermiso/actualizarPermisoResponse';

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

  AgregarRol(Rol: AgregarRolRequest): Observable<AgregarRolResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/registrarRol`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarRolResponse>(uri, Rol, { headers: headers });
  }

  VerRol(id: number): Observable<VerRolResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/verRol/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerRolResponse>(uri, { headers: headers });
  }

  EditarRol(Rol: EditarRolRequest): Observable<EditarRolResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/editarRol`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarRolResponse>(uri, Rol, { headers: headers });
  }

  EliminarRol(id: number): Observable<EliminarRolResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/eliminarRol/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarRolResponse>(uri, { headers: headers });
  }

  ObtenerMenuRol(termino: string): Observable<Array<ObtenerMenuRolResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/obtenerMenuRoles/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerRolResponse>>(uri, { headers: headers });
  }

  ObtenerMenuXRol(id: number): Observable<Array<ObtenerMenuXRolResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/obtenerMenuPorRoles/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerMenuXRolResponse>>(uri, { headers: headers });
  }

  ActualizarPermiso(request: ActualizarPermisoRequest): Observable<ActualizarPermisoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Rol/actualizarPermiso`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<ActualizarPermisoResponse>(uri, request, { headers: headers });
  }
}
