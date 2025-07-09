import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMedioPagoRequest } from '../models/MedioPago/AgregarMedioPago/AgregarMedioPagoRequest';
import { AgregarMedioPagoResponse } from '../models/MedioPago/AgregarMedioPago/AgregarMedioPagoResponse';
import { EditarMedioPagoRequest } from '../models/MedioPago/EditarMedioPago/EditarMedioPagoRequest';
import { EditarMedioPagoResponse } from '../models/MedioPago/EditarMedioPago/EditarMedioPagoResponse';
import { EliminarMedioPagoResponse } from '../models/MedioPago/EliminarMedioPago/EliminarMedioPagoResponse';
import { ObtenerMedioPagoResponse } from '../models/MedioPago/ObtenerMedioPago/ObtenerMedioPagoResponse';
import { VerMedioPagoResponse } from '../models/MedioPago/VerMedioPago/VerMedioPagoResponse';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class MedioPagoService extends Api {

  ObtenerMedioPago(termino: string): Observable<Array<ObtenerMedioPagoResponse>> {
    const uri = `${this.url}/MedioPago/obtenerMedioPago/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMedioPagoResponse>>(uri, { headers: headers });
  }

  AgregarMedioPago(MedioPago: AgregarMedioPagoRequest): Observable<AgregarMedioPagoResponse> {
    const uri = `${this.url}/MedioPago/registrarMedioPago`;
    const headers = this._headers;
    return this.http.post<AgregarMedioPagoResponse>(uri, MedioPago, { headers: headers });
  }

  VerMedioPago(id: number): Observable<VerMedioPagoResponse> {
    const uri = `${this.url}/MedioPago/verMedioPago/${id}`;
    const headers = this._headers;
    return this.http.get<VerMedioPagoResponse>(uri, { headers: headers });
  }

  EditarMedioPago(MedioPago: EditarMedioPagoRequest): Observable<EditarMedioPagoResponse> {
    const uri = `${this.url}/MedioPago/editarMedioPago`;
    const headers = this._headers;
    return this.http.put<EditarMedioPagoResponse>(uri, MedioPago, { headers: headers });
  }

  EliminarMedioPago(id: number): Observable<EliminarMedioPagoResponse> {
    const uri = `${this.url}/MedioPago/eliminarMedioPago/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarMedioPagoResponse>(uri, { headers: headers });
  }

  ObtenerMedioPagoMenu(): Observable<Array<ObtenerMedioPagoResponse>> {
    const uri = `${this.url}/MedioPago/obtenerMedioPagoMenu`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMedioPagoResponse>>(uri, { headers: headers });
  }
}
