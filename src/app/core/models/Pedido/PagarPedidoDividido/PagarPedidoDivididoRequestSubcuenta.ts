import { PagarPedidoDivididoDetalle } from "./PagarPedidoDivididoDetalle";

export interface PagarPedidoDivididoRequestSubcuenta {
    idCliente: number;
    detallePedidoSubcuenta: PagarPedidoDivididoDetalle[];
}