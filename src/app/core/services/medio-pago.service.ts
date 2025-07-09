import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMedioPagoRequest } from '../models/MedioPago/AgregarMedioPago/AgregarMedioPagoRequest';
import { AgregarMedioPagoResponse } from '../models/MedioPago/AgregarMedioPago/AgregarMedioPagoResponse';
import { EditarMedioPagoRequest } from '../models/MedioPago/EditarMedioPago/EditarMedioPagoRequest';
import { EditarMedioPagoResponse } from '../models/MedioPago/EditarMedioPago/EditarMedioPagoResponse';
import { EliminarMedioPagoResponse } from '../models/MedioPago/EliminarMedioPago/EliminarMedioPagoResponse';
import { ObtenerMedioPagoResponse } from '../models/MedioPago/ObtenerMedioPago/ObtenerMedioPagoResponse';
import { VerMedioPagoResponse } from '../models/MedioPago/VerMedioPago/VerMedioPagoResponse';
import { constants } from '../models/utils/contants';
import { LocalStorageService } from './local-storage.service';
import { ObtenerMedioPagoMenuResponse } from '../models/MedioPago/ObtenerMedioPagoMenu/ObtenerMedioPagoMenuResponse';

@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerMedioPago(termino: string): Observable<Array<ObtenerMedioPagoResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/MedioPago/obtenerMedioPago/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerMedioPagoResponse>>(uri, { headers: headers });
  }

  AgregarMedioPago(MedioPago: AgregarMedioPagoRequest): Observable<AgregarMedioPagoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/MedioPago/registrarMedioPago`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarMedioPagoResponse>(uri, MedioPago, { headers: headers });
  }

  VerMedioPago(id: number): Observable<VerMedioPagoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/MedioPago/verMedioPago/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerMedioPagoResponse>(uri, { headers: headers });
  }

  EditarMedioPago(MedioPago: EditarMedioPagoRequest): Observable<EditarMedioPagoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/MedioPago/editarMedioPago`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarMedioPagoResponse>(uri, MedioPago, { headers: headers });
  }

  EliminarMedioPago(id: number): Observable<EliminarMedioPagoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/MedioPago/eliminarMedioPago/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarMedioPagoResponse>(uri, { headers: headers });
  }

  ObtenerMedioPagoMenu(): Observable<Array<ObtenerMedioPagoMenuResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/MedioPago/obtenerMedioPagoMenu`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerMedioPagoMenuResponse>>(uri, { headers: headers });
  }
}
