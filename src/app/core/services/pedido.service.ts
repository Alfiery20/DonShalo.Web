import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AgregarPedidoRequest } from '../models/Pedido/AgregarPedido/AgregarPedidoRequest';
import { AgregarPedidoResponse } from '../models/Pedido/AgregarPedido/AgregarPedidoResponse';
import { constants } from '../models/utils/contants';
import { Observable } from 'rxjs';
import { ObtenerPedidoResponse } from '../models/Pedido/ObtenerPedido/ObtenerPedidoResponse';
import { ObtenerDetallePedidoResponse } from '../models/Pedido/ObtenerDetallePedido/ObtenerDetallePedidoResponse';
import { EditarPedidoRequest } from '../models/Pedido/EditarPedido/EditarPedidoRequest';
import { EditarPedidoResponse } from '../models/Pedido/EditarPedido/EditarPedidoResponse';
import { EliminarPedidoResponse } from '../models/Pedido/EliminarPedido/EliminarPedidoResponse';
import { VerDetallePedidoPagarResponse } from '../models/Pedido/VerDetallePedidoPagar/VerDetallePedidoPagarResponse';
import { PagarPedidoDivididoRequest } from '../models/Pedido/PagarPedidoDividido/PagarPedidoDivididoRequest';
import { PagarPedidoDivididoResponse } from '../models/Pedido/PagarPedidoDividido/PagarPedidoDivididoResponse';
import { PagarPedidoResponse } from '../models/Pedido/PagarPedido/PagarPedidoResponse';
import { PagarPedidoRequest } from '../models/Pedido/PagarPedido/PagarPedidoRequest';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }

  ObtenerPedido(id: number): Observable<ObtenerPedidoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/obtenerPedidoMesa/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ObtenerPedidoResponse>(uri, { headers: headers });
  }

  AgregarPedido(pedido: AgregarPedidoRequest): Observable<AgregarPedidoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/agregarPedido`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<AgregarPedidoResponse>(uri, pedido, { headers: headers });
  }

  ObtenerDetallePedido(id: number): Observable<Array<ObtenerDetallePedidoResponse>> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/obtenerDetallePedido/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<Array<ObtenerDetallePedidoResponse>>(uri, { headers: headers });
  }

  EditarPedido(pedido: EditarPedidoRequest): Observable<EditarPedidoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/editarPedido`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<EditarPedidoResponse>(uri, pedido, { headers: headers });
  }

  EliminarPedido(id: number): Observable<EliminarPedidoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/eliminarPedido/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<EliminarPedidoResponse>(uri, { headers: headers });
  }

  VerDetallePedidoPagar(id: number): Observable<VerDetallePedidoPagarResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/verDetallePedidoPagar/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<VerDetallePedidoPagarResponse>(uri, { headers: headers });
  }

  RegistrarPedidoDividido(request: PagarPedidoDivididoRequest): Observable<PagarPedidoDivididoResponse> {
    var token = this.localService.getItem('token');
    const uri = `${constants.apiUrl}/Pedido/pagarPedidoDividido`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<PagarPedidoDivididoResponse>(uri, request, { headers: headers });
  }

  PagarPedido(idPedido: number): Observable<PagarPedidoResponse> {
    var token = this.localService.getItem('token');
    var request: PagarPedidoRequest =
    {
      idPedido: idPedido
    };
    const uri = `${constants.apiUrl}/Pedido/pagarPedido`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<PagarPedidoResponse>(uri, request, { headers: headers });
  }
}

