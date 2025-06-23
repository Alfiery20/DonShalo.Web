import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMesaRequest } from '../models/Mesa/AgregarMesa/AgregarMesaRequest';
import { AgregarMesaResponse } from '../models/Mesa/AgregarMesa/AgregarMesaResponse';
import { EditarMesaRequest } from '../models/Mesa/EditarMesa/EditarMesaRequest';
import { EditarMesaResponse } from '../models/Mesa/EditarMesa/EditarMesaResponse';
import { ObtenerMesaRequest } from '../models/Mesa/ObtenerMesa/ObtenerMesaRequest';
import { ObtenerMesaResponse } from '../models/Mesa/ObtenerMesa/ObtenerMesaResponse';
import { VerMesaResponse } from '../models/Mesa/VerMesa/VerMesaResponse';
import { constants } from '../models/utils/contants';
import { LocalStorageService } from './local-storage.service';
import { EliminarMesaResponse } from '../models/Mesa/EliminarMesa/EliminarMesaResponse';
import { ObtenerEstadoMesaResponse } from '../models/Mesa/ObtenerEstadoMesa/ObtenerEstadoMesaResponse';
import { LimpiarMesaResponse } from '../models/Mesa/LimpiarMesa/LimpiarMesaResponse';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerMesa(termino: ObtenerMesaRequest): Observable<Array<ObtenerMesaResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/obtenerMesa`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<Array<ObtenerMesaResponse>>(uri, termino, { headers: headers });
  }

  AgregarMesa(Mesa: AgregarMesaRequest): Observable<AgregarMesaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/registrarMesa`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarMesaResponse>(uri, Mesa, { headers: headers });
  }

  VerMesa(id: number): Observable<VerMesaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/verMesa/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerMesaResponse>(uri, { headers: headers });
  }

  EditarMesa(Mesa: EditarMesaRequest): Observable<EditarMesaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/editarMesa`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarMesaResponse>(uri, Mesa, { headers: headers });
  }

  EliminarMesa(id: number): Observable<EliminarMesaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/eliminarMesa/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarMesaResponse>(uri, { headers: headers });
  }

  ObtenerEstadoMesa(idPiso: number): Observable<Array<ObtenerEstadoMesaResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/obtenerEstadoMesas/${idPiso}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<Array<ObtenerEstadoMesaResponse>>(uri, { headers: headers });
  }

  LimpiarMesa(idPedido: number): Observable<LimpiarMesaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Mesa/limpiarMesa/${idPedido}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<LimpiarMesaResponse>(uri, { headers: headers });
  }
}
