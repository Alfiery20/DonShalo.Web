import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarPlatoRequest } from '../models/Plato/AgregarPlato/AgregarPlatoRequest';
import { AgregarPlatoResponse } from '../models/Plato/AgregarPlato/AgregarPlatoResponse';
import { EditarPlatoRequest } from '../models/Plato/EditarPlato/EditarPlatoRequest';
import { EliminarPlatoResponse } from '../models/Plato/EliminarPlato/EliminarPlatoResponse';
import { ObtenerPlatoResponse } from '../models/Plato/ObtenerPlato/ObtenerPlatoResponse';
import { VerPlatoResponse } from '../models/Plato/VerPlato/VerPlatoResponse';
import { EditarPlatoResponse } from '../models/Plato/EditarPlato/EditarPlatoResponse';
import { ObtenerPlatoRequest } from '../models/Plato/ObtenerPlato/ObtenerPlatoRequest';
import { ObtenerMenuPlatoResponse } from '../models/Plato/ObtenerMenuPlato/ObtenerMenuPlatoResponse';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class PlatoService extends Api {

  ObtenerPlato(request: ObtenerPlatoRequest): Observable<Array<ObtenerPlatoResponse>> {
    const uri = `${this.url}/Plato/obtenerPlato`;
    const headers = this._headers;
    return this.http.post<Array<ObtenerPlatoResponse>>(uri, request, { headers: headers });
  }

  AgregarPlato(Plato: AgregarPlatoRequest): Observable<AgregarPlatoResponse> {
    const uri = `${this.url}/Plato/registrarPlato`;
    const headers = this._headers;
    return this.http.post<AgregarPlatoResponse>(uri, Plato, { headers: headers });
  }

  VerPlato(id: number): Observable<VerPlatoResponse> {
    const uri = `${this.url}/Plato/verPlato/${id}`;
    const headers = this._headers;
    return this.http.get<VerPlatoResponse>(uri, { headers: headers });
  }

  EditarPlato(Plato: EditarPlatoRequest): Observable<EditarPlatoResponse> {
    const uri = `${this.url}/Plato/editarPlato`;
    const headers = this._headers;
    return this.http.put<EditarPlatoResponse>(uri, Plato, { headers: headers });
  }

  EliminarPlato(id: number): Observable<EliminarPlatoResponse> {
    const uri = `${this.url}/Plato/eliminarPlato/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarPlatoResponse>(uri, { headers: headers });
  }

  ObtenerMenuPlato(request: number): Observable<Array<ObtenerMenuPlatoResponse>> {
    const uri = `${this.url}/Plato/obtenerMenuPlato/${request}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMenuPlatoResponse>>(uri, { headers: headers });
  }
}
