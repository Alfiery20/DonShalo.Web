import { Injectable } from '@angular/core';
import { ObtenerPisoResponse } from '../models/Piso/ObtenerPiso/obtenerPisoResponse';
import { Observable } from 'rxjs';
import { AgregarPisoRequest } from '../models/Piso/agregarPiso/agregarPisoRequest';
import { AgregarPisoResponse } from '../models/Piso/agregarPiso/agregarPisoResponse';
import { VerPisoResponse } from '../models/Piso/verPiso/verPisoResponse';
import { EditarPisoResponse } from '../models/Piso/editarPiso/editarPisoResponse';
import { EditarPisoRequest } from '../models/Piso/editarPiso/editarPisoRequest';
import { ELiminarPisoResponse } from '../models/Piso/eliminarPiso/eliminarPisoResponse';
import { ObtenerPisoRequest } from '../models/Piso/ObtenerPiso/obtenerPisoRequest';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class PisoService extends Api {

  ObtenerPiso(termino: ObtenerPisoRequest): Observable<Array<ObtenerPisoResponse>> {
    const uri = `${this.url}/Piso/obtenerPiso`;
    const headers = this._headers;
    return this.http.post<Array<ObtenerPisoResponse>>(uri, termino, { headers: headers });
  }

  AgregarPiso(Piso: AgregarPisoRequest): Observable<AgregarPisoResponse> {
    const uri = `${this.url}/Piso/registrarPiso`;
    const headers = this._headers;
    return this.http.post<AgregarPisoResponse>(uri, Piso, { headers: headers });
  }

  VerPiso(id: number): Observable<VerPisoResponse> {
    const uri = `${this.url}/Piso/verPiso/${id}`;
    const headers = this._headers;
    return this.http.get<VerPisoResponse>(uri, { headers: headers });
  }

  EditarPiso(Piso: EditarPisoRequest): Observable<EditarPisoResponse> {
    const uri = `${this.url}/Piso/editarPiso`;
    const headers = this._headers;
    return this.http.put<EditarPisoResponse>(uri, Piso, { headers: headers });
  }

  EliminarPiso(id: number): Observable<ELiminarPisoResponse> {
    const uri = `${this.url}/Piso/eliminarPiso/${id}`;
    const headers = this._headers;
    return this.http.delete<ELiminarPisoResponse>(uri, { headers: headers });
  }
}
