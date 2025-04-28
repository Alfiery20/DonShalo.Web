import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IniciarSesionRequest } from '../models/iniciarSesion/iniciarSesionRequest';
import { IniciarSesionResponse } from '../models/iniciarSesion/IniciarSesionResponse';
import { Observable } from 'rxjs';
import { constants } from '../models/utils/contants';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) { }

  IniciarSesion(usuarioLogin: IniciarSesionRequest): Observable<IniciarSesionResponse> {
    const uri = `${constants.apiUrl}/Autenticacion/iniciarSesion`;
    return this.http.post<IniciarSesionResponse>(uri, usuarioLogin);
  }
}
