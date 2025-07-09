import { Injectable } from '@angular/core';
import { AgregarPedidoRequest } from '../models/Pedido/AgregarPedido/AgregarPedidoRequest';
import { AgregarPedidoResponse } from '../models/Pedido/AgregarPedido/AgregarPedidoResponse';
import { Observable } from 'rxjs';
import { ObtenerPedidoResponse } from '../models/Pedido/ObtenerPedido/ObtenerPedidoResponse';
import { ObtenerDetallePedidoResponse } from '../models/Pedido/ObtenerDetallePedido/ObtenerDetallePedidoResponse';
import { EditarPedidoRequest } from '../models/Pedido/EditarPedido/EditarPedidoRequest';
import { EditarPedidoResponse } from '../models/Pedido/EditarPedido/EditarPedidoResponse';
import { EliminarPedidoResponse } from '../models/Pedido/EliminarPedido/EliminarPedidoResponse';
import { VerDetallePedidoPagarResponse } from '../models/Pedido/VerDetallePedidoPagar/VerDetallePedidoPagarResponse';
import { Api } from '../classes/api';
import { PagarPedidoDivididoRequest } from '../models/Pedido/PagarPedidoDividido/PagarPedidoDivididoRequest';
import { PagarPedidoDivididoResponse } from '../models/Pedido/PagarPedidoDividido/PagarPedidoDivididoResponse';
import { PagarPedidoResponse } from '../models/Pedido/PagarPedido/PagarPedidoResponse';
import { PagarPedidoRequest } from '../models/Pedido/PagarPedido/PagarPedidoRequest';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends Api {

  ObtenerPedido(id: number): Observable<ObtenerPedidoResponse> {
    const uri = `${this.url}/Pedido/obtenerPedidoMesa/${id}`;
    const headers = this._headers;
    return this.http.get<ObtenerPedidoResponse>(uri, { headers: headers });
  }

  AgregarPedido(pedido: AgregarPedidoRequest): Observable<AgregarPedidoResponse> {
    const uri = `${this.url}/Pedido/agregarPedido`;
    const headers = this._headers;
    return this.http.post<AgregarPedidoResponse>(uri, pedido, { headers: headers });
  }

  ObtenerDetallePedido(id: number): Observable<Array<ObtenerDetallePedidoResponse>> {
    const uri = `${this.url}/Pedido/obtenerDetallePedido/${id}`;
    const headers = this._headers;
    return this.http.get<Array<ObtenerDetallePedidoResponse>>(uri, { headers: headers });
  }

  EditarPedido(pedido: EditarPedidoRequest): Observable<EditarPedidoResponse> {
    const uri = `${this.url}/Pedido/editarPedido`;
    const headers = this._headers;
    return this.http.put<EditarPedidoResponse>(uri, pedido, { headers: headers });
  }

  EliminarPedido(id: number): Observable<EliminarPedidoResponse> {
    const uri = `${this.url}/Pedido/eliminarPedido/${id}`;
    const headers = this._headers;
    return this.http.delete<EliminarPedidoResponse>(uri, { headers: headers });
  }

  VerDetallePedidoPagar(id: number): Observable<VerDetallePedidoPagarResponse> {
    const uri = `${this.url}/Pedido/verDetallePedidoPagar/${id}`;
    const headers = this._headers;
    return this.http.get<VerDetallePedidoPagarResponse>(uri, { headers: headers });
  }

  RegistrarPedidoDividido(request: PagarPedidoDivididoRequest): Observable<PagarPedidoDivididoResponse> {
    const uri = `${this.url}/Pedido/pagarPedidoDividido`;
    const headers = this._headers;
    return this.http.post<PagarPedidoDivididoResponse>(uri, request, { headers: headers });
  }

  PagarPedido(idPedido: number): Observable<PagarPedidoResponse> {
    var request: PagarPedidoRequest =
    {
      idPedido: idPedido
    };
    const uri = `${this.url}/Pedido/pagarPedido`;
    const headers = this._headers;
    return this.http.post<PagarPedidoResponse>(uri, request, { headers: headers });
  }
}

