import { AgregarPedidoDetalle } from "./AgregarPedidoDetalle";

export interface AgregarPedidoRequest {
    idCliente: number,
    idMesa: number,
    idPersonal: number,
    detallePedido: AgregarPedidoDetalle[]
}