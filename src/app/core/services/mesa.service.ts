import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMesaRequest } from '../models/Mesa/AgregarMesa/AgregarMesaRequest';
import { AgregarMesaResponse } from '../models/Mesa/AgregarMesa/AgregarMesaResponse';
import { EditarMesaRequest } from '../models/Mesa/EditarMesa/EditarMesaRequest';
import { EditarMesaResponse } from '../models/Mesa/EditarMesa/EditarMesaResponse';
import { ObtenerMesaRequest } from '../models/Mesa/ObtenerMesa/ObtenerMesaRequest';
import { ObtenerMesaResponse } from '../models/Mesa/ObtenerMesa/ObtenerMesaResponse';
import { VerMesaResponse } from '../models/Mesa/VerMesa/VerMesaResponse';
import { EliminarMesaResponse } from '../models/Mesa/EliminarMesa/EliminarMesaResponse';
import { ObtenerEstadoMesaResponse } from '../models/Mesa/ObtenerEstadoMesa/ObtenerEstadoMesaResponse';
import { Api } from '../classes/api';
import { LimpiarMesaResponse } from '../models/Mesa/LimpiarMesa/LimpiarMesaResponse';

@Injectable({
  providedIn: 'root'
})
export class MesaService extends Api {

  ObtenerMesa(termino: ObtenerMesaRequest): Observable<Array<ObtenerMesaResponse>> {
    const uri = `${this.url}/Mesa/obtenerMesa`;
    const headers = this._headers;
    return this.http.post<Array<ObtenerMesaResponse>>(uri, termino, { headers: headers });
  }

  AgregarMesa(Mesa: AgregarMesaRequest): Observable<AgregarMesaResponse> {
    const uri = `${this.url}/Mesa/registrarMesa`;
    const headers = this._headers;
    return this.http.post<AgregarMesaResponse>(uri, Mesa, { headers: headers });
  }

  VerMesa(id: number): Observable<VerMesaResponse> {
    const uri = `${this.url}/Mesa/verMesa/${id}`;
    const headers = this._headers;
    return this.http.get<VerMesaResponse>(uri, { headers: headers });
  }

  EditarMesa(Mesa: EditarMesaRequest): Observable<EditarMesaResponse> {
    const uri = `${this.url}/Mesa/editarMesa`;
    const headers = this._headers;
    return this.http.put<EditarMesaResponse>(uri, Mesa, { headers: headers });
  }

  EliminarMesa(id: number): Observable<EliminarMesaResponse> {
    const uri = `${this.url}/Mesa/eliminarMesa/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarMesaResponse>(uri, { headers: headers });
  }

  ObtenerEstadoMesa(idPiso: number): Observable<Array<ObtenerEstadoMesaResponse>> {
    const uri = `${this.url}/Mesa/obtenerEstadoMesas/${idPiso}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerEstadoMesaResponse>>(uri, { headers: headers });
  }

  LimpiarMesa(idPedido: number): Observable<LimpiarMesaResponse> {
    const uri = `${this.url}/Mesa/limpiarMesa/${idPedido}`;
    const headers = this._headers;
    return this.http.get<LimpiarMesaResponse>(uri, { headers: headers });
  }
}
