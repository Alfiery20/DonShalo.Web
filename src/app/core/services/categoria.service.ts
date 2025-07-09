import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarCategoriaRequest } from '../models/Categoria/AgregarCategoria/AgregarCategoriaRequest';
import { AgregarCategoriaResponse } from '../models/Categoria/AgregarCategoria/AgregarCategoriaResponse';
import { EditarCategoriaRequest } from '../models/Categoria/EditarCategoria/EditarCategoriaRequest';
import { EliminarCategoriaResponse } from '../models/Categoria/EliminarCategoria/EliminarCategoriaResponse';
import { ObtenerCategoriaResponse } from '../models/Categoria/ObtenerCategoria/ObtenerCategoriaResponse';
import { VerCategoriaResponse } from '../models/Categoria/VerCategoria/VerCategoriaResponse';
import { EditarCategoriaRespone } from '../models/Categoria/EditarCategoria/EditarCategoriaResponse';
import { ObtenerMenuCategoriaResponse } from '../models/Categoria/ObtenerMenuCategoria/ObtenerMenuCategoriaResponse';
import { Api } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends Api {

  ObtenerCategoria(termino: string): Observable<Array<ObtenerCategoriaResponse>> {
    const uri = `${this.url}/Categoria/obtenerCategoria/${termino}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerCategoriaResponse>>(uri, { headers: headers });
  }

  AgregarCategoria(Categoria: AgregarCategoriaRequest): Observable<AgregarCategoriaResponse> {
    const uri = `${this.url}/Categoria/registrarCategoria`;
    const headers = this._headers;
    return this.http.post<AgregarCategoriaResponse>(uri, Categoria, { headers: headers });
  }

  VerCategoria(id: number): Observable<VerCategoriaResponse> {
    const uri = `${this.url}/Categoria/verCategoria/${id}`;
    const headers = this._headers;
    return this.http.get<VerCategoriaResponse>(uri, { headers: headers });
  }

  EditarCategoria(Categoria: EditarCategoriaRequest): Observable<EditarCategoriaRespone> {
    const uri = `${this.url}/Categoria/editarCategoria`;
    const headers = this._headers;
    return this.http.put<EditarCategoriaRespone>(uri, Categoria, { headers: headers });
  }

  EliminarCategoria(id: number): Observable<EliminarCategoriaResponse> {
    const uri = `${this.url}/Categoria/eliminarCategoria/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarCategoriaResponse>(uri, { headers: headers });
  }

  ObtenerMenuCategoria(): Observable<Array<ObtenerMenuCategoriaResponse>> {
    const uri = `${this.url}/Categoria/obtenerMenuCategoria`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerMenuCategoriaResponse>>(uri, { headers: headers });
  }
}
