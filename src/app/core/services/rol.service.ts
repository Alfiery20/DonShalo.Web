import { Injectable } from '@angular/core';
import { ObtenerRolResponse } from '../models/Rol/ObtenerRol/ObtenerRolResponse';
import { Observable } from 'rxjs';
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
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class RolService extends Api {

  ObtenerRol(termino: string): Observable<Array<ObtenerRolResponse>> {
    const uri = `${this.url}/Rol/obtenerRoles/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerRolResponse>>(uri, { headers: headers });
  }

  AgregarRol(Rol: AgregarRolRequest): Observable<AgregarRolResponse> {
    const uri = `${this.url}/Rol/registrarRol`;
    const headers = this._headers;
    return this.http.post<AgregarRolResponse>(uri, Rol, { headers: headers });
  }

  VerRol(id: number): Observable<VerRolResponse> {
    const uri = `${this.url}/Rol/verRol/${id}`;
    const headers = this._headers;
    return this.http.get<VerRolResponse>(uri, { headers: headers });
  }

  EditarRol(Rol: EditarRolRequest): Observable<EditarRolResponse> {
    const uri = `${this.url}/Rol/editarRol`;
    const headers = this._headers;
    return this.http.put<EditarRolResponse>(uri, Rol, { headers: headers });
  }

  EliminarRol(id: number): Observable<EliminarRolResponse> {
    const uri = `${this.url}/Rol/eliminarRol/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarRolResponse>(uri, { headers: headers });
  }

  ObtenerMenuRol(termino: string): Observable<Array<ObtenerMenuRolResponse>> {
    const uri = `${this.url}/Rol/obtenerMenuRoles/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerRolResponse>>(uri, { headers: headers });
  }

  ObtenerMenuXRol(id: number): Observable<Array<ObtenerMenuXRolResponse>> {
    const uri = `${this.url}/Rol/obtenerMenuPorRoles/${id}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMenuXRolResponse>>(uri, { headers: headers });
  }

  ActualizarPermiso(request: ActualizarPermisoRequest): Observable<ActualizarPermisoResponse> {
    const uri = `${this.url}/Rol/actualizarPermiso`;
    const headers = this._headers;
    return this.http.post<ActualizarPermisoResponse>(uri, request, { headers: headers });
  }
}
