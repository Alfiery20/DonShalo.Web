import { VerDetallePedidoParaPagarDetalle } from "./VerDetallePedidoParaPagarDetalleResponse";

export interface VerDetallePedidoPagarResponse {
    id: number;
    nroSerie: string;
    nroCorrelativo: string;
    clienteNatural: string;
    clienteJuridico: string;
    personal: string;
    mesa: string;
    detalles: VerDetallePedidoParaPagarDetalle[]
}