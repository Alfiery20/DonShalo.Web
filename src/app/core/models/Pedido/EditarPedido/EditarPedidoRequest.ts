import { EditarPedidoDetalle } from "./EditarPedidoDetalle";

export interface EditarPedidoRequest {
    idPedido: number;
    idCliente: number;
    detallePedido: EditarPedidoDetalle[]
}