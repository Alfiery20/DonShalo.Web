import { AgregarPedidoDetalle } from "./AgregarPedidoDetalle";

export interface AgregarPedidoRequest {
    idCliente: number | null,
    idMesa: number,
    idPersonal: number,
    detallePedido: AgregarPedidoDetalle[]
}