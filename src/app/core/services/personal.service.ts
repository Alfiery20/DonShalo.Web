import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObtenerPersonalRequest } from '../models/Personal/obtenerPersonal/obtenerPersonalRequest';
import { VerPersonalResponse } from '../models/Personal/verPersonal/verPersonalResponse';
import { AgregarPersonalRequest } from '../models/Personal/agregarPersonal/agregarPersonalRequest';
import { AgregarPersonalResponse } from '../models/Personal/agregarPersonal/agregarPersonalResponse';
import { EditarPersonalRequest } from '../models/Personal/editarPersonal/editarPersonalRequest';
import { EditarPersonalResponse } from '../models/Personal/editarPersonal/editarPersonalResponse';
import { EliminarPersonalResponse } from '../models/Personal/eliminarPersonal/eliminarPersonalResponse';
import { ObtenerPersonalResponse } from '../models/Personal/obtenerPersonal/obtenerPersonalResponse';
import { ObtenerMenuPersonalResponse } from '../models/Personal/obtenerMenuPersonal/obtenerMenuPersonalResponse';
import { AsignarResponsableResponse } from '../models/Personal/asignarResponsable/asignarResponsableResponse';
import { AsignarResponsableRequest } from '../models/Personal/asignarResponsable/asignarResponsableRequest';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class PersonalService extends Api {

  ObtenerPersonal(Personal: ObtenerPersonalRequest): Observable<Array<ObtenerPersonalResponse>> {
    const uri = `${this.url}/Personal/obtenerPersonal`;
    const headers = this._headers;
    return this.http.post<Array<ObtenerPersonalResponse>>(uri, Personal, { headers });
  }

  AgregarPersonal(Personal: AgregarPersonalRequest): Observable<AgregarPersonalResponse> {
    const uri = `${this.url}/Personal/registrarPersonal`;
    const headers = this._headers;
    return this.http.post<AgregarPersonalResponse>(uri, Personal, { headers });
  }

  VerPersonal(id: number): Observable<VerPersonalResponse> {
    const uri = `${this.url}/Personal/verPersonal/${id}`;
    const headers = this._headers;
    return this.http.get<VerPersonalResponse>(uri, { headers });
  }

  EditarPersonal(Personal: EditarPersonalRequest): Observable<EditarPersonalResponse> {
    const uri = `${this.url}/Personal/editarPersonal`;
    const headers = this._headers;
    return this.http.put<EditarPersonalResponse>(uri, Personal, { headers });
  }

  EliminarPersonal(id: number): Observable<EliminarPersonalResponse> {
    const uri = `${this.url}/Personal/eliminarPersonal/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarPersonalResponse>(uri, { headers });
  }

  ObtenerMenuPersonal(termino: string): Observable<Array<ObtenerMenuPersonalResponse>> {
    const uri = `${this.url}/Personal/obtenerMenuPersonal/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerPersonalResponse>>(uri, { headers });
  }

  AsignarResponsable(idPersonal: number): Observable<AsignarResponsableResponse> {
    var Personal: AsignarResponsableRequest = {
      idPersonal: idPersonal
    }
    const uri = `${this.url}/Personal/asignarPersonal`;
    const headers = this._headers;
    return this.http.post<AsignarResponsableResponse>(uri, Personal, { headers });
  }
}
