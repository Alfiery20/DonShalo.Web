import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarPlatoRequest } from '../models/Plato/AgregarPlato/AgregarPlatoRequest';
import { AgregarPlatoResponse } from '../models/Plato/AgregarPlato/AgregarPlatoResponse';
import { EditarPlatoRequest } from '../models/Plato/EditarPlato/EditarPlatoRequest';
import { EliminarPlatoResponse } from '../models/Plato/EliminarPlato/EliminarPlatoResponse';
import { ObtenerPlatoResponse } from '../models/Plato/ObtenerPlato/ObtenerPlatoResponse';
import { VerPlatoResponse } from '../models/Plato/VerPlato/VerPlatoResponse';
import { constants } from '../models/utils/contants';
import { LocalStorageService } from './local-storage.service';
import { EditarPlatoResponse } from '../models/Plato/EditarPlato/EditarPlatoResponse';
import { ObtenerPlatoRequest } from '../models/Plato/ObtenerPlato/ObtenerPlatoRequest';
import { ObtenerMenuPlatoResponse } from '../models/Plato/ObtenerMenuPlato/ObtenerMenuPlatoResponse';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerPlato(request: ObtenerPlatoRequest): Observable<Array<ObtenerPlatoResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Plato/obtenerPlato`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<Array<ObtenerPlatoResponse>>(uri, request, { headers: headers });
  }

  AgregarPlato(Plato: AgregarPlatoRequest): Observable<AgregarPlatoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Plato/registrarPlato`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarPlatoResponse>(uri, Plato, { headers: headers });
  }

  VerPlato(id: number): Observable<VerPlatoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Plato/verPlato/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerPlatoResponse>(uri, { headers: headers });
  }

  EditarPlato(Plato: EditarPlatoRequest): Observable<EditarPlatoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Plato/editarPlato`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarPlatoResponse>(uri, Plato, { headers: headers });
  }

  EliminarPlato(id: number): Observable<EliminarPlatoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Plato/eliminarPlato/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarPlatoResponse>(uri, { headers: headers });
  }

  ObtenerMenuPlato(request: number): Observable<Array<ObtenerMenuPlatoResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Plato/obtenerMenuPlato/${request}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerMenuPlatoResponse>>(uri, { headers: headers });
  }
}
