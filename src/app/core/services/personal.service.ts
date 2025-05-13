import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { ObtenerPersonalRequest } from '../models/obtenerPersonal/obtenerPersonalRequest';
import { constants } from '../models/utils/contants';
import { VerPersonalResponse } from '../models/verPersonal/verPersonalResponse';
import { AgregarPersonalRequest } from '../models/agregarPersonal/agregarPersonalRequest';
import { AgregarPersonalResponse } from '../models/agregarPersonal/agregarPersonalResponse';
import { EditarPersonalRequest } from '../models/editarPersonal/editarPersonalRequest';
import { EditarPersonalResponse } from '../models/editarPersonal/editarPersonalResponse';
import { EliminarPersonalResponse } from '../models/eliminarPersonal/eliminarPersonalResponse';
import { ObtenerPersonalResponse } from '../models/obtenerPersonal/obtenerPersonalResponse';
import { ObtenerMenuPersonalResponse } from '../models/obtenerMenuPersonal/obtenerMenuPersonalResponse';
import { AsignarResponsableResponse } from '../models/asignarResponsable/asignarResponsableResponse';
import { AsignarResponsableRequest } from '../models/asignarResponsable/asignarResponsableRequest';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerPersonal(Personal: ObtenerPersonalRequest): Observable<Array<ObtenerPersonalResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/obtenerPersonal`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<Array<ObtenerPersonalResponse>>(uri, Personal, { headers: headers });
  }

  AgregarPersonal(Personal: AgregarPersonalRequest): Observable<AgregarPersonalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/registrarPersonal`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarPersonalResponse>(uri, Personal, { headers: headers });
  }

  VerPersonal(id: number): Observable<VerPersonalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/verPersonal/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerPersonalResponse>(uri, { headers: headers });
  }

  EditarPersonal(Personal: EditarPersonalRequest): Observable<EditarPersonalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/editarPersonal`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarPersonalResponse>(uri, Personal, { headers: headers });
  }

  EliminarPersonal(id: number): Observable<EliminarPersonalResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/eliminarPersonal/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarPersonalResponse>(uri, { headers: headers });
  }

  ObtenerMenuPersonal(termino: string): Observable<Array<ObtenerMenuPersonalResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/obtenerMenuPersonal/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerPersonalResponse>>(uri, { headers: headers });
  }

  AsignarResponsable(idPersonal: number): Observable<AsignarResponsableResponse> {
    var Personal: AsignarResponsableRequest = {
      idPersonal: idPersonal
    }
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Personal/asignarPersonal`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AsignarResponsableResponse>(uri, Personal, { headers: headers });
  }
}
