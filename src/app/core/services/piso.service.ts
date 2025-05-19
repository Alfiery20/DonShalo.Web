import { Injectable } from '@angular/core';
import { ObtenerPisoResponse } from '../models/Piso/ObtenerPiso/obtenerPisoResponse';
import { constants } from '../models/utils/contants';
import { Observable } from 'rxjs';
import { AgregarPisoRequest } from '../models/Piso/agregarPiso/agregarPisoRequest';
import { AgregarPisoResponse } from '../models/Piso/agregarPiso/agregarPisoResponse';
import { VerPisoResponse } from '../models/Piso/verPiso/verPisoResponse';
import { EditarPisoResponse } from '../models/Piso/editarPiso/editarPisoResponse';
import { EditarPisoRequest } from '../models/Piso/editarPiso/editarPisoRequest';
import { ELiminarPisoResponse } from '../models/Piso/eliminarPiso/eliminarPisoResponse';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { ObtenerPisoRequest } from '../models/Piso/ObtenerPiso/obtenerPisoRequest';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerPiso(termino: ObtenerPisoRequest): Observable<Array<ObtenerPisoResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Piso/obtenerPiso`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<Array<ObtenerPisoResponse>>(uri, termino, { headers: headers });
  }

  AgregarPiso(Piso: AgregarPisoRequest): Observable<AgregarPisoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Piso/registrarPiso`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarPisoResponse>(uri, Piso, { headers: headers });
  }

  VerPiso(id: number): Observable<VerPisoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Piso/verPiso/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerPisoResponse>(uri, { headers: headers });
  }

  EditarPiso(Piso: EditarPisoRequest): Observable<EditarPisoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Piso/editarPiso`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarPisoResponse>(uri, Piso, { headers: headers });
  }

  EliminarPiso(id: number): Observable<ELiminarPisoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Piso/eliminarPiso/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<ELiminarPisoResponse>(uri, { headers: headers });
  }
}
