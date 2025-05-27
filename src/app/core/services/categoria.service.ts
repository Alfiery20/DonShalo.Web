import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarCategoriaRequest } from '../models/Categoria/AgregarCategoria/AgregarCategoriaRequest';
import { AgregarCategoriaResponse } from '../models/Categoria/AgregarCategoria/AgregarCategoriaResponse';
import { EditarCategoriaRequest } from '../models/Categoria/EditarCategoria/EditarCategoriaRequest';
import { EliminarCategoriaResponse } from '../models/Categoria/EliminarCategoria/EliminarCategoriaResponse';
import { ObtenerCategoriaResponse } from '../models/Categoria/ObtenerCategoria/ObtenerCategoriaResponse';
import { VerCategoriaResponse } from '../models/Categoria/VerCategoria/VerCategoriaResponse';
import { constants } from '../models/utils/contants';
import { LocalStorageService } from './local-storage.service';
import { EditarCategoriaRespone } from '../models/Categoria/EditarCategoria/EditarCategoriaResponse';
import { ObtenerMenuCategoriaResponse } from '../models/Categoria/ObtenerMenuCategoria/ObtenerMenuCategoriaResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerCategoria(termino: string): Observable<Array<ObtenerCategoriaResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Categoria/obtenerCategoria/${termino}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerCategoriaResponse>>(uri, { headers: headers });
  }

  AgregarCategoria(Categoria: AgregarCategoriaRequest): Observable<AgregarCategoriaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Categoria/registrarCategoria`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarCategoriaResponse>(uri, Categoria, { headers: headers });
  }

  VerCategoria(id: number): Observable<VerCategoriaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Categoria/verCategoria/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<VerCategoriaResponse>(uri, { headers: headers });
  }

  EditarCategoria(Categoria: EditarCategoriaRequest): Observable<EditarCategoriaRespone> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Categoria/editarCategoria`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarCategoriaRespone>(uri, Categoria, { headers: headers });
  }

  EliminarCategoria(id: number): Observable<EliminarCategoriaResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Categoria/eliminarCategoria/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<EliminarCategoriaResponse>(uri, { headers: headers });
  }

  ObtenerMenuCategoria(): Observable<Array<ObtenerMenuCategoriaResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Categoria/obtenerMenuCategoria`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerMenuCategoriaResponse>>(uri, { headers: headers });
  }
}
