import { PagarPedidoDivididoDetalle } from "./PagarPedidoDivididoDetalle";

export interface PagarPedidoDivididoRequestSubcuenta {
    idCliente: number;
    idMedioPago: number,
    detallePedidoSubcuenta: PagarPedidoDivididoDetalle[];
}