import { PagarPedidoDivididoDetalle } from "./PagarPedidoDivididoDetalle";
import { PagarPedidoDivididoRequestSubcuenta } from "./PagarPedidoDivididoRequestSubcuenta";

export interface PagarPedidoDivididoRequest {
    idPedido: number,
    idMedioPago: number,
    detallePedido: PagarPedidoDivididoDetalle[],
    subcuentas: PagarPedidoDivididoRequestSubcuenta[]
}