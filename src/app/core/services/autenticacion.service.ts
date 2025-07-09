import { Injectable } from '@angular/core';
import { IniciarSesionRequest } from '../models/Autenticacion/iniciarSesion/iniciarSesionRequest';
import { IniciarSesionResponse } from '../models/Autenticacion/iniciarSesion/IniciarSesionResponse';
import { Observable } from 'rxjs';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService extends Api {
  IniciarSesion(usuarioLogin: IniciarSesionRequest): Observable<IniciarSesionResponse> {
    const uri = `${this.url}/Autenticacion/iniciarSesion`;
    return this.http.post<IniciarSesionResponse>(uri, usuarioLogin);
  }
}
